// greenslipsData.ts

export interface Greenslip {
  id: number;
  title: string;
  brand: string;
  image: string;
  expiryDate: Date;
  dateCreated: Date;
  description: string;
  claimCount: number;
  category: string;
  uniqueCode: string;
}

export const greenslips: Greenslip[] = [
  {
    id: 1,
    title: 'Summer Music Festival Pass',
    brand: 'FestivalCo',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-08-31'),
    dateCreated: new Date('2023-05-01'),
    description: 'Get exclusive access to all summer music festivals organized by FestivalCo. Enjoy live performances from top artists all season long!',
    claimCount: 1500,
    category: 'Event',
    uniqueCode: 'FEST2023SUM001'
  },
  {
    id: 2,
    title: '25% Off All Electronics',
    brand: 'TechStore',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-07-15'),
    dateCreated: new Date('2023-06-01'),
    description: 'Upgrade your gadgets with a 25% discount on all electronics at TechStore. Valid for both online and in-store purchases.',
    claimCount: 3200,
    category: 'Shopping',
    uniqueCode: 'TECH25OFF002'
  },
  {
    id: 3,
    title: 'Web3 Hackathon Participation',
    brand: 'CryptoDevs',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-09-30'),
    dateCreated: new Date('2023-06-15'),
    description: 'Join the Web3 Hackathon and showcase your blockchain development skills. Win prizes and network with industry leaders!',
    claimCount: 500,
    category: 'Tech Event',
    uniqueCode: 'WEB3HACK2023'
  },
  {
    id: 4,
    title: 'Free Coffee for a Month',
    brand: 'CafeDeluxe',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-08-31'),
    dateCreated: new Date('2023-07-01'),
    description: 'Enjoy one free coffee per day for a whole month at any CafeDeluxe location. Start your mornings right!',
    claimCount: 2000,
    category: 'Food & Beverage',
    uniqueCode: 'COFFEEMONT004'
  },
  {
    id: 5,
    title: 'VIP Movie Premiere Access',
    brand: 'CinePlex',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-10-15'),
    dateCreated: new Date('2023-06-20'),
    description: 'Get VIP access to the premiere of the most anticipated movie of the year. Walk the red carpet and mingle with stars!',
    claimCount: 300,
    category: 'Entertainment',
    uniqueCode: 'VIPMOVIEPRE005'
  },
  {
    id: 6,
    title: '50% Off Gym Membership',
    brand: 'FitLife',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-09-30'),
    dateCreated: new Date('2023-07-01'),
    description: 'Kickstart your fitness journey with a 50% discount on a 6-month gym membership at FitLife. Access to all equipment and classes included!',
    claimCount: 800,
    category: 'Fitness',
    uniqueCode: 'FITLIFE50OFF006'
  },
  {
    id: 7,
    title: 'Exclusive NFT Art Drop',
    brand: 'CryptoArtGallery',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-08-15'),
    dateCreated: new Date('2023-07-10'),
    description: 'Be among the first to claim this exclusive NFT artwork by renowned digital artist, CryptoMaster. Limited edition of 100.',
    claimCount: 100,
    category: 'Digital Art',
    uniqueCode: 'NFTARTDROP007'
  },
  {
    id: 8,
    title: 'Free Car Wash with Oil Change',
    brand: 'AutoCare',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-09-30'),
    dateCreated: new Date('2023-06-15'),
    description: 'Get a free premium car wash with every oil change service at AutoCare. Keep your ride clean and running smoothly!',
    claimCount: 1200,
    category: 'Automotive',
    uniqueCode: 'AUTOWASH2023008'
  },
  {
    id: 9,
    title: 'Early Access to New Sneaker Release',
    brand: 'SportsGear',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-08-20'),
    dateCreated: new Date('2023-07-05'),
    description: 'Be the first to get your hands on the latest limited edition sneakers. Exclusive pre-order access for Greenslip holders!',
    claimCount: 500,
    category: 'Fashion',
    uniqueCode: 'SNEAKDROP2023009'
  },
  {
    id: 10,
    title: 'Blockchain Conference Entry',
    brand: 'CryptoSummit',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-11-30'),
    dateCreated: new Date('2023-07-01'),
    description: 'Gain entry to the biggest blockchain conference of the year. Network with industry leaders and discover the latest in crypto innovation.',
    claimCount: 1000,
    category: 'Tech Event',
    uniqueCode: 'CRYPTOSUM2023010'
  },
  {
    id: 11,
    title: 'Free Month of Music Streaming',
    brand: 'MelodyStream',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-09-15'),
    dateCreated: new Date('2023-07-15'),
    description: 'Enjoy a full month of ad-free music streaming on MelodyStream. Access millions of songs and exclusive podcasts!',
    claimCount: 5000,
    category: 'Entertainment',
    uniqueCode: 'MELODYMONTH011'
  },
  {
    id: 12,
    title: 'Exclusive Cooking Masterclass',
    brand: 'GourmetChef',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-10-31'),
    dateCreated: new Date('2023-07-01'),
    description: 'Join a virtual cooking masterclass with world-renowned chef, Maria Cuisine. Learn gourmet techniques and secret recipes!',
    claimCount: 300,
    category: 'Education',
    uniqueCode: 'GOURMETCLASS012'
  },
  {
    id: 13,
    title: '20% Off Your Next Hotel Booking',
    brand: 'TravelEase',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-12-31'),
    dateCreated: new Date('2023-06-01'),
    description: 'Save 20% on your next hotel booking through TravelEase. Valid for bookings worldwide, subject to availability.',
    claimCount: 2500,
    category: 'Travel',
    uniqueCode: 'TRAVELEASE20013'
  },
  {
    id: 14,
    title: 'Free E-book: Intro to Blockchain',
    brand: 'CryptoEducators',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-09-30'),
    dateCreated: new Date('2023-07-01'),
    description: 'Download our comprehensive e-book on blockchain technology for free. Perfect for beginners and intermediate learners alike.',
    claimCount: 10000,
    category: 'Education',
    uniqueCode: 'BLOCKCHAINBOOK014'
  },
  {
    id: 15,
    title: 'Virtual Reality Game Beta Access',
    brand: 'VRGaming',
    image: require('../../assets/discount.jpg'),
    expiryDate: new Date('2023-08-31'),
    dateCreated: new Date('2023-07-15'),
    description: 'Be among the first to play our upcoming VR game before its official release. Help shape the future of VR gaming!',
    claimCount: 1000,
    category: 'Gaming',
    uniqueCode: 'VRBETA2023015'
  }
];