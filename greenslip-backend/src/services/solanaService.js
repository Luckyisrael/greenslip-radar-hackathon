// File: src/services/solanaService.js

const web3 = require('@solana/web3.js');
const borsh = require('borsh');
const { generateUniqueCode, generateBarcode } = require('../utils/voucherUtils');
const { BN } = require('bn.js');

//const PROGRAM_ID = new web3.PublicKey('Your_Program_ID_Here');
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

// Define the schema for our voucher data
class VoucherType {}
class Voucher {
  constructor(properties) {
    Object.assign(this, properties);
  }
}

const VoucherSchema = new Map([
  [VoucherType, { kind: 'enum', field: 'enum', values: ['PercentageDiscount', 'FixedAmount', 'BuyOneGetOne', 'EventTicket'] }],
  [Voucher, {
    kind: 'struct',
    fields: [
      ['voucherType', VoucherType],
      ['issuer', [32]],
      ['claimer', { kind: 'option', type: [32] }],
      ['isRedeemed', 'u8'],
      ['expirationTime', 'i64'],
      ['uniqueCode', 'string'],
    ],
  }],
]);

// Helper function to create an instruction
function createInstructionData(instruction, params) {
  const schema = new Map([
    [Object, { kind: 'struct', fields: [['instruction', 'u8'], ...Object.entries(params)] }],
  ]);
  const data = new (Object.fromEntries(schema))({ instruction, ...params });
  return Buffer.from(borsh.serialize(schema, data));
}

async function createVoucher(issuerWallet, voucherType, expirationTime) {
  const voucherAccount = web3.Keypair.generate();
  const uniqueCode = generateUniqueCode();
  
  const createIx = new web3.TransactionInstruction({
    keys: [
      { pubkey: issuerWallet.publicKey, isSigner: true, isWritable: true },
      { pubkey: voucherAccount.publicKey, isSigner: false, isWritable: true },
      { pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: createInstructionData(0, { // 0 = Create Voucher instruction
      voucherType,
      expirationTime: new BN(expirationTime),
      uniqueCode,
    }),
  });

  const tx = new web3.Transaction().add(createIx);
  const signature = await web3.sendAndConfirmTransaction(connection, tx, [issuerWallet, voucherAccount]);
  
  const barcode = await generateBarcode(uniqueCode);

  return { 
    signature, 
    voucherPublicKey: voucherAccount.publicKey.toBase58(),
    uniqueCode,
    barcode
  };
}

async function claimVoucher(claimerWallet, voucherPublicKey) {
  const claimIx = new web3.TransactionInstruction({
    keys: [
      { pubkey: claimerWallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: new web3.PublicKey(voucherPublicKey), isSigner: false, isWritable: true },
    ],
    programId: PROGRAM_ID,
    data: createInstructionData(1, {}), // 1 = Claim Voucher instruction
  });

  const tx = new web3.Transaction().add(claimIx);
  return await web3.sendAndConfirmTransaction(connection, tx, [claimerWallet]);
}

async function redeemVoucher(claimerWallet, voucherPublicKey) {
  const redeemIx = new web3.TransactionInstruction({
    keys: [
      { pubkey: claimerWallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: new web3.PublicKey(voucherPublicKey), isSigner: false, isWritable: true },
    ],
    programId: PROGRAM_ID,
    data: createInstructionData(2, {}), // 2 = Redeem Voucher instruction
  });

  const tx = new web3.Transaction().add(redeemIx);
  return await web3.sendAndConfirmTransaction(connection, tx, [claimerWallet]);
}

async function redeemVoucherByCode(claimerWallet, uniqueCode) {
  // First, we need to find the voucher account by unique code
  // This requires an on-chain lookup, which we'll implement as a separate function
  const voucherAccount = await findVoucherByCode(uniqueCode);

  if (!voucherAccount) {
    throw new Error('Voucher not found');
  }

  const redeemIx = new web3.TransactionInstruction({
    keys: [
      { pubkey: claimerWallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: voucherAccount, isSigner: false, isWritable: true },
    ],
    programId: PROGRAM_ID,
    data: createInstructionData(3, { uniqueCode }), // 3 = Redeem Voucher By Code instruction
  });

  const tx = new web3.Transaction().add(redeemIx);
  return await web3.sendAndConfirmTransaction(connection, tx, [claimerWallet]);
}

async function findVoucherByCode(uniqueCode) {
  // This function would typically involve a getProgramAccounts call
  // and filter the results based on the unique code
  // For efficiency in a production environment, consider using an off-chain database
  // to store the mapping between unique codes and account public keys
  const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
    filters: [
      { dataSize: 1000 }, // Adjust based on your actual account data size
      {
        memcmp: {
          offset: 64 + 32 + 1 + 8, // Adjust based on your actual data structure
          bytes: uniqueCode,
        },
      },
    ],
  });

  if (accounts.length === 0) {
    return null;
  }

  return accounts[0].pubkey;
}

async function getVoucherDetails(voucherPublicKey) {
  const accountInfo = await connection.getAccountInfo(new web3.PublicKey(voucherPublicKey));
  if (accountInfo === null) {
    throw new Error('Voucher not found');
  }
  const voucher = borsh.deserialize(VoucherSchema, Voucher, accountInfo.data);
  return voucher;
}

async function getAllVouchers() {
  const accounts = await connection.getProgramAccounts(PROGRAM_ID);
  return Promise.all(accounts.map(async (account) => {
    const voucher = borsh.deserialize(VoucherSchema, Voucher, account.account.data);
    return {
      publicKey: account.pubkey.toBase58(),
      ...voucher,
    };
  }));
}

async function getVouchersByIssuer(issuerPublicKey) {
  const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
    filters: [
      {
        memcmp: {
          offset: 0, // Assuming issuer is the first field in the account data
          bytes: issuerPublicKey.toBase58(),
        },
      },
    ],
  });

  return Promise.all(accounts.map(async (account) => {
    const voucher = borsh.deserialize(VoucherSchema, Voucher, account.account.data);
    return {
      publicKey: account.pubkey.toBase58(),
      ...voucher,
    };
  }));
 
}

async function getAllVouchers(skip = 0, limit = 10) {
    const accounts = await connection.getProgramAccounts(PROGRAM_ID);
    const vouchers = await Promise.all(accounts.map(async (account) => {
      const voucher = borsh.deserialize(VoucherSchema, Voucher, account.account.data);
      return {
        publicKey: account.pubkey.toBase58(),
        ...voucher,
      };
    }));
    return vouchers.slice(skip, skip + limit);
  }
  
  async function getVoucherCount() {
    const accounts = await connection.getProgramAccounts(PROGRAM_ID);
    return accounts.length;
  }
  
  async function getVouchersByIssuer(issuerPublicKey, skip = 0, limit = 10) {
    const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
      filters: [
        {
          memcmp: {
            offset: 0, // Assuming issuer is the first field in the account data
            bytes: issuerPublicKey.toBase58(),
          },
        },
      ],
    });
  
    const vouchers = await Promise.all(accounts.map(async (account) => {
      const voucher = borsh.deserialize(VoucherSchema, Voucher, account.account.data);
      return {
        publicKey: account.pubkey.toBase58(),
        ...voucher,
      };
    }));
    return vouchers.slice(skip, skip + limit);
  }
  
  async function getVoucherCountByIssuer(issuerPublicKey) {
    const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: issuerPublicKey.toBase58(),
          },
        },
      ],
    });
    return accounts.length;
  }
  
  async function searchVouchers(searchCriteria, skip = 0, limit = 10) {
    const { query, voucherType, minValue, maxValue, status } = searchCriteria;
    const accounts = await connection.getProgramAccounts(PROGRAM_ID);
    
    const filteredVouchers = (await Promise.all(accounts.map(async (account) => {
      const voucher = borsh.deserialize(VoucherSchema, Voucher, account.account.data);
      const voucherData = {
        publicKey: account.pubkey.toBase58(),
        ...voucher,
      };
  
      // Apply filters
      if (query && !voucherData.uniqueCode.includes(query)) return null;
      if (voucherType && voucherData.voucherType !== voucherType) return null;
      if (minValue && voucherData.value < minValue) return null;
      if (maxValue && voucherData.value > maxValue) return null;
      if (status) {
        const currentTime = new Date().getTime();
        if (status === 'active' && (voucherData.isRedeemed || voucherData.expirationTime < currentTime)) return null;
        if (status === 'expired' && voucherData.expirationTime >= currentTime) return null;
        if (status === 'redeemed' && !voucherData.isRedeemed) return null;
      }
  
      return voucherData;
    }))).filter(Boolean);
  
    return filteredVouchers.slice(skip, skip + limit);
  }
  
  async function getSearchVoucherCount(searchCriteria) {
    const vouchers = await searchVouchers(searchCriteria, 0, Number.MAX_SAFE_INTEGER);
    return vouchers.length;
  }
  
  async function getVouchersByStatus(status, skip = 0, limit = 10) {
    const accounts = await connection.getProgramAccounts(PROGRAM_ID);
    const currentTime = new Date().getTime();
  
    const filteredVouchers = (await Promise.all(accounts.map(async (account) => {
      const voucher = borsh.deserialize(VoucherSchema, Voucher, account.account.data);
      const voucherData = {
        publicKey: account.pubkey.toBase58(),
        ...voucher,
      };
  
      if (status === 'active' && !voucherData.isRedeemed && voucherData.expirationTime >= currentTime) return voucherData;
      if (status === 'expired' && voucherData.expirationTime < currentTime) return voucherData;
      if (status === 'redeemed' && voucherData.isRedeemed) return voucherData;
  
      return null;
    }))).filter(Boolean);
  
    return filteredVouchers.slice(skip, skip + limit);
  }
  
  async function getVoucherCountByStatus(status) {
    const vouchers = await getVouchersByStatus(status, 0, Number.MAX_SAFE_INTEGER);
    return vouchers.length;
  }
  
  async function updateVoucher(issuerWallet, voucherPublicKey, expirationTime, discountValue) {
    const updateIx = new web3.TransactionInstruction({
      keys: [
        { pubkey: issuerWallet.publicKey, isSigner: true, isWritable: false },
        { pubkey: new web3.PublicKey(voucherPublicKey), isSigner: false, isWritable: true },
      ],
      programId: PROGRAM_ID,
      data: createInstructionData(4, { // 4 = Update Voucher instruction
        expirationTime: new BN(expirationTime),
        discountValue: new BN(discountValue),
      }),
    });
  
    const tx = new web3.Transaction().add(updateIx);
    const signature = await web3.sendAndConfirmTransaction(connection, tx, [issuerWallet]);
  
    // Fetch and return the updated voucher details
    return await getVoucherDetails(voucherPublicKey);
  }
  
  module.exports = {
    createVoucher,
    claimVoucher,
    redeemVoucher,
    redeemVoucherByCode,
    getVoucherDetails,
    getAllVouchers,
    getVoucherCount,
    getVouchersByIssuer,
    getVoucherCountByIssuer,
    searchVouchers,
    getSearchVoucherCount,
    getVouchersByStatus,
    getVoucherCountByStatus,
    updateVoucher,
  };