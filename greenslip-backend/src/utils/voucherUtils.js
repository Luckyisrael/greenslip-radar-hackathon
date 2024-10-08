const QRCode = require('qrcode');
const crypto = require('crypto');

function generateUniqueCode() {
  return crypto.randomBytes(8).toString('hex');
}

async function generateBarcode(uniqueCode) {
  try {
    const barcodeDataUrl = await QRCode.toDataURL(uniqueCode);
    return barcodeDataUrl;
  } catch (error) {
    console.error('Error generating barcode:', error);
    throw error;
  }
}

module.exports = {
  generateUniqueCode,
  generateBarcode,
};