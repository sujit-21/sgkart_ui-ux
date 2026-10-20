// Realistic mock products for SGKart Indian E-Commerce Marketplace
export const initialProducts = [
  // ELECTRONICS
  {
    id: 'prod-elec-1',
    name: 'SG ProMax 5G Smartphone (128GB, Ocean Blue, 8GB RAM)',
    slug: 'sg-promax-5g-smartphone',
    brand: 'TechNova',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 18999,
    originalPrice: 24999,
    discountPercent: 24,
    rating: 4.6,
    reviewCount: 3820,
    inStock: true,
    stockCount: 45,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience blazing-fast 5G speeds, a 120Hz Super AMOLED display, and an industry-leading 108MP AI triple camera system. Designed with aerospace-grade materials and an all-day 5000mAh battery with 67W Turbo Charge.',
    features: [
      '6.67-inch FHD+ 120Hz Super AMOLED Display',
      '108MP Quad Camera with OIS + 16MP Selfie Camera',
      'MediaTek Dimensity 8200 Ultra Processor',
      '5000 mAh High-Density Battery with 67W Sonic Charging',
      'Dual Stereo Speakers with Dolby Atmos'
    ],
    specifications: {
      'Network': '5G / 4G LTE / Dual SIM (nano+nano)',
      'Operating System': 'Android 14 with SG OS 4.0',
      'Processor': 'Octa Core 3.1 GHz Dimensity 8200',
      'RAM / Storage': '8GB LPDDR5 / 128GB UFS 3.1',
      'Warranty': '1 Year Brand Warranty + 6 Months Battery Warranty'
    },
    reviews: [
      { id: 'rev-1', user: 'Rahul Sharma', rating: 5, date: '12 Oct 2026', comment: 'Superb phone at this price range! Battery lasts almost 1.5 days. Delivered in 2 days by SGKart.', verified: true },
      { id: 'rev-2', user: 'Pooja Verma', rating: 4, date: '04 Oct 2026', comment: 'Camera quality is crisp in daylight. Low light photos are decent. Great screen.', verified: true },
      { id: 'rev-3', user: 'Arun Iyer', rating: 5, date: '28 Sep 2026', comment: 'Premium feel in hand, very fast charging. SG Assured delivery was on time.', verified: true }
    ]
  },
  {
    id: 'prod-elec-2',
    name: 'AcousticBeat ANC Wireless Headphones with 40H Playtime',
    slug: 'acousticbeat-anc-wireless-headphones',
    brand: 'AcousticBeat',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 3499,
    originalPrice: 6999,
    discountPercent: 50,
    rating: 4.5,
    reviewCount: 1940,
    inStock: true,
    stockCount: 82,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immerse yourself in deep bass and silence ambient noise with Active Noise Cancellation (up to 32dB). Featuring plush memory foam ear cushions, ultra-low latency gaming mode, and rapid Type-C fast charging.',
    features: [
      'Hybrid Active Noise Cancellation with Transparency Mode',
      'Custom tuned 40mm Neodymium dynamic drivers',
      'Up to 40 hours continuous playback on single charge',
      'Bluetooth 5.3 with multipoint dual pairing',
      'Built-in ENC microphone for crystal-clear calls'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Bluetooth Version': 'v5.3',
      'Battery Life': '40 Hours (ANC Off) / 28 Hours (ANC On)',
      'Charging Time': '10 mins for 5 hours playback',
      'Warranty': '1 Year Domestic Replacement Warranty'
    },
    reviews: [
      { id: 'rev-4', user: 'Kunal Sen', rating: 5, date: '15 Oct 2026', comment: 'Unbelievable bass and comfort! Fits snugly over ears without pain.', verified: true },
      { id: 'rev-5', user: 'Neha Gupta', rating: 4, date: '10 Oct 2026', comment: 'ANC works nicely for office AC hum and traffic. Value for money.', verified: true }
    ]
  },
  {
    id: 'prod-elec-3',
    name: 'PulseFit Track 3 AMOLED Smartwatch with Bluetooth Calling',
    slug: 'pulsefit-track-3-amoled-smartwatch',
    brand: 'PulseFit',
    category: 'Electronics',
    subcategory: 'Wearables',
    price: 2199,
    originalPrice: 5999,
    discountPercent: 63,
    rating: 4.4,
    reviewCount: 5210,
    inStock: true,
    stockCount: 110,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Elevate your daily wellness with the 1.96-inch curved AMOLED display offering 850 nits peak brightness. Includes 120+ sports modes, SpO2 & 24/7 heart-rate monitoring, and AI voice assistance.',
    features: [
      '1.96" Curved HD AMOLED Always-On Display',
      'Single-chip Bluetooth v5.3 Calling with Hi-Fi speaker',
      '120+ sports tracking modes with auto workout detection',
      'IP68 Water and Sweat Resistance',
      '7 to 10 days battery life under standard usage'
    ],
    specifications: {
      'Display': '1.96 inch AMOLED (410x502 resolution)',
      'Sensors': 'Optical Heart Rate, SpO2, Accelerometer, Sleep tracker',
      'Compatibility': 'iOS 11+ and Android 7.0+',
      'Water Resistance': 'IP68 certified up to 1.5m',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    reviews: [
      { id: 'rev-6', user: 'Vikas Malhotra', rating: 5, date: '18 Oct 2026', comment: 'Screen brightness in direct sunlight is amazing. Bluetooth calls are loud and clear.', verified: true }
    ]
  },
  {
    id: 'prod-elec-4',
    name: 'ZenBook Ultra Thin 14-inch Laptop (16GB RAM, 512GB SSD)',
    slug: 'zenbook-ultra-thin-14-laptop',
    brand: 'NovaTech',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 49990,
    originalPrice: 65990,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 840,
    inStock: true,
    stockCount: 18,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed for professionals on the move. Weighing just 1.3kg with an all-metal chassis, backlit chiclet keyboard, Intel Core i5 13th Gen CPU, and vibrant 2.5K IPS anti-glare display.',
    features: [
      '14-inch 2.5K IPS 100% sRGB Screen',
      'Intel Core i5 13th Gen 10-core processor',
      '16GB LPDDR5 RAM & 512GB NVMe M.2 SSD',
      'Backlit Ergonomic Keyboard & Fingerprint Reader',
      'Thunderbolt 4 / USB-C Fast Charging support'
    ],
    specifications: {
      'Weight': '1.38 kg',
      'Processor': 'Intel Core i5-1335U',
      'Battery': '60Whr Battery (up to 11 hours)',
      'OS': 'Windows 11 Home + MS Office pre-installed',
      'Warranty': '2 Years Onsite Warranty'
    },
    reviews: [
      { id: 'rev-7', user: 'Shreya Patel', rating: 5, date: '11 Oct 2026', comment: 'Extremely fast bootup, lightweight for college and office. Battery life is solid 8+ hours.', verified: true }
    ]
  },
  {
    id: 'prod-elec-5',
    name: 'CinemaView 55-inch 4K Ultra HD Smart Google TV with Dolby Vision',
    slug: 'cinemaview-55-inch-4k-smart-tv',
    brand: 'CinemaView',
    category: 'Electronics',
    subcategory: 'TVs',
    price: 31999,
    originalPrice: 48990,
    discountPercent: 35,
    rating: 4.5,
    reviewCount: 2210,
    inStock: true,
    stockCount: 14,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 3,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bring cinema right to your living room. 4K HDR10+ with Dolby Vision, bezel-less metal design, 30W front-firing Dolby Atmos speakers, and built-in Chromecast & Google Assistant.',
    features: [
      '55-inch 4K UHD Bezel-less Panel (3840 x 2160)',
      'Dolby Vision & HDR10+ certified picture tuning',
      '30W Stereo Speakers with Dolby Atmos support',
      'Google TV OS with access to 10,000+ apps',
      '3 x HDMI 2.1 & 2 x USB ports with eARC'
    ],
    specifications: {
      'Resolution': '4K Ultra HD (3840x2160)',
      'Refresh Rate': '60Hz with MEMC Motion Smoothing',
      'Sound': '30 Watts Dolby Atmos',
      'Connectivity': 'Dual Band Wi-Fi, Bluetooth 5.1',
      'Warranty': '1 Year Comprehensive + 1 Year additional on panel'
    },
    reviews: [
      { id: 'rev-8', user: 'Deepak Rao', rating: 5, date: '14 Oct 2026', comment: 'Stunning colors and loud audio. OTT apps run butter smooth on Google TV.', verified: true }
    ]
  },

  // FASHION
  {
    id: 'prod-fash-1',
    name: 'Royal Heritage Men Embroidered Kurta Set with Dupatta',
    slug: 'royal-heritage-men-embroidered-kurta-set',
    brand: 'SG Ethno',
    category: 'Fashion',
    subcategory: 'Ethnic Wear',
    price: 1899,
    originalPrice: 4299,
    discountPercent: 56,
    rating: 4.4,
    reviewCount: 1140,
    inStock: true,
    stockCount: 60,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfect for festive celebrations and wedding functions. Tailored from a premium silk blend with intricate mandarin collar zari embroidery, matching churidar pyjama, and lightweight designer dupatta.',
    features: [
      'Art Silk Blend Fabric with breathable cotton lining',
      'Intricate Thread & Resham Zari Neck Embroidery',
      'Full sleeves with regular comfort fit',
      'Includes Kurta, Pyjama, and Stole'
    ],
    specifications: {
      'Fabric': 'Dupion Art Silk',
      'Pattern': 'Embroidered Festive',
      'Care': 'Dry Clean Recommended',
      'Country of Origin': 'India'
    },
    reviews: [
      { id: 'rev-9', user: 'Manish Tyagi', rating: 5, date: '16 Oct 2026', comment: 'Wore it for Diwali party, received so many compliments. Stitching is premium!', verified: true }
    ]
  },
  {
    id: 'prod-fash-2',
    name: 'Kanjivaram Style Banarasi Silk Zari Saree with Blouse Piece',
    slug: 'kanjivaram-banarasi-silk-zari-saree',
    brand: 'Virasat Weaves',
    category: 'Fashion',
    subcategory: 'Women Sarees',
    price: 2499,
    originalPrice: 7999,
    discountPercent: 69,
    rating: 4.7,
    reviewCount: 2890,
    inStock: true,
    stockCount: 35,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Authentic Indian royal craftsmanship. Woven with rich golden zari borders and pallu, featuring traditional peacock motifs. Comes with an unstitched brocade blouse piece.',
    features: [
      'Pure Litchi Silk blend with golden jacquard weave',
      'Grand woven pallu and temple border motif',
      'Saree Length: 5.5 meters + 0.8 meter blouse fabric',
      'Soft drape suitable for long festive hours'
    ],
    specifications: {
      'Material': 'Banarasi Art Silk',
      'Length': '6.3 meters total with blouse',
      'Occasion': 'Festive, Wedding, Reception',
      'Country of Origin': 'Varanasi, India'
    },
    reviews: [
      { id: 'rev-10', user: 'Anjali Deshmukh', rating: 5, date: '10 Oct 2026', comment: 'Color is exactly as shown. Fabric has a royal sheen without being heavy.', verified: true }
    ]
  },
  {
    id: 'prod-fash-3',
    name: 'UrbanStride Breathable Air-Cushion Running Sneakers',
    slug: 'urbanstride-air-cushion-running-sneakers',
    brand: 'UrbanStride',
    category: 'Fashion',
    subcategory: 'Footwear',
    price: 1499,
    originalPrice: 3499,
    discountPercent: 57,
    rating: 4.3,
    reviewCount: 4120,
    inStock: true,
    stockCount: 95,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience bouncy shock absorption and feather-light agility. Engineered mesh upper keeps your feet cool, while the high-grip rubber outsole ensures confident traction on roads and gym floors.',
    features: [
      'Responsive Air-Cushioned EVA Midsole',
      'Breathable Fly-knit stretch upper',
      'Anti-microbial memory foam insole',
      'Non-slip grooved rubber outsole'
    ],
    specifications: {
      'Closure': 'Lace-Up',
      'Sole Material': 'Phylon & Rubber',
      'Upper Material': 'Mesh Textile',
      'Warranty': '90 Days Manufacturer Warranty'
    },
    reviews: [
      { id: 'rev-11', user: 'Karthik Raja', rating: 4, date: '17 Oct 2026', comment: 'Very comfortable for morning 5km jogs. Size 9 fits true.', verified: true }
    ]
  },
  {
    id: 'prod-fash-4',
    name: 'BikerStyle Vintage Brown Handcrafted Leather Jacket',
    slug: 'bikerstyle-vintage-brown-leather-jacket',
    brand: 'Wildcraft Outfitters',
    category: 'Fashion',
    subcategory: 'Outerwear',
    price: 3799,
    originalPrice: 7999,
    discountPercent: 52,
    rating: 4.6,
    reviewCount: 680,
    inStock: true,
    stockCount: 25,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 3,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A timeless silhouette made with distressed faux vegan leather, metallic YKK zippers, thermal quilted inner lining, and windproof ribbed cuffs. Built to last through cold winters and highway rides.',
    features: [
      'Weather-resistant premium distressed finish',
      'Multiple utility zippered chest and hand pockets',
      'Snap-tab collar with heavy-duty metal hardware',
      'Quilted satin interior for warmth and ease'
    ],
    specifications: {
      'Material': 'High-Grade PU Vegan Leather',
      'Lining': '100% Polyester Taffeta',
      'Style': 'Classic Cafe Racer / Biker',
      'Fit': 'Slim European Fit'
    },
    reviews: [
      { id: 'rev-12', user: 'Siddharth Roy', rating: 5, date: '08 Oct 2026', comment: 'Looks super stylish! Keeps wind out while riding my bike at night.', verified: true }
    ]
  },

  // HOME & KITCHEN
  {
    id: 'prod-home-1',
    name: 'AeroFry Smart Digital Rapid Air Fryer 4.5L (1500W)',
    slug: 'aerofry-smart-digital-air-fryer-4-5l',
    brand: 'KitchenCraft',
    category: 'Home & Kitchen',
    subcategory: 'Small Appliances',
    price: 3699,
    originalPrice: 7999,
    discountPercent: 54,
    rating: 4.6,
    reviewCount: 3410,
    inStock: true,
    stockCount: 40,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crispy samosas, fries, and grilled paneer with up to 90% less oil. 360-degree rapid air vortex technology, 8 one-touch preset digital menus, and a dishwasher-safe non-stick basket.',
    features: [
      '4.5L Family Capacity with Non-stick PTFE-free basket',
      '8 One-Touch Cooking Presets with Digital Touchscreen',
      'Up to 200°C Adjustable Temp & 60 min Timer',
      'Auto Shut-off with Overheat Protection',
      'Free Recipe E-book included'
    ],
    specifications: {
      'Power': '1500 Watts',
      'Capacity': '4.5 Litres',
      'Weight': '3.9 kg',
      'Warranty': '2 Years Replacement Guarantee'
    },
    reviews: [
      { id: 'rev-13', user: 'Sunita Joshi', rating: 5, date: '19 Oct 2026', comment: 'Fries and tikkas come out so crisp without drowning in oil. Easy to wash too.', verified: true }
    ]
  },
  {
    id: 'prod-home-2',
    name: 'RoboClean Intelligent Laser Navigation Robot Vacuum & Mop',
    slug: 'roboclean-laser-robot-vacuum-and-mop',
    brand: 'NovaTech Home',
    category: 'Home & Kitchen',
    subcategory: 'Appliances',
    price: 17999,
    originalPrice: 32999,
    discountPercent: 45,
    rating: 4.5,
    reviewCount: 920,
    inStock: true,
    stockCount: 15,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Automate your home cleaning effortlessly. Equipped with LDS LiDAR radar mapping, 4000Pa powerful suction, simultaneous electronic controlled mopping, and custom room zoning via smartphone app.',
    features: [
      'LiDAR 360° Real-time room mapping and obstacle avoidance',
      '4000Pa Cyclone Suction with carpet auto-boost',
      '2-in-1 sweeping and water regulated mopping',
      'Works with Alexa, Google Home, and Mobile App',
      'Auto-recharge and resume cleaning'
    ],
    specifications: {
      'Suction Power': '4000 Pa',
      'Battery Capacity': '5200 mAh (150 mins runtime)',
      'Dustbin / Water Tank': '450ml / 250ml',
      'Warranty': '1 Year Standard Warranty'
    },
    reviews: [
      { id: 'rev-14', user: 'Harish Nair', rating: 5, date: '13 Oct 2026', comment: 'Maps the entire 3BHK flat in 10 minutes. Cleans under the beds and sofas easily.', verified: true }
    ]
  },
  {
    id: 'prod-home-3',
    name: 'BaristaTouch Espresso & Cappuccino Coffee Maker (15-Bar)',
    slug: 'baristatouch-espresso-coffee-maker',
    brand: 'KitchenCraft',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    price: 6499,
    originalPrice: 12999,
    discountPercent: 50,
    rating: 4.7,
    reviewCount: 1430,
    inStock: true,
    stockCount: 22,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebd02ae2a0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Brew cafe-grade rich crema espressos, velvety lattes, and frothy cappuccinos at home. Features an Italian 15-bar ULKA pump, stainless steel steam wand for milk frothing, and heated cup warmer tray.',
    features: [
      '15-Bar High Pressure Italian Pump system',
      'Stainless Steel Swivel Steam Frothing Wand',
      'Dual Filter for single and double espresso shots',
      'Removable 1.2L transparent water reservoir',
      'Drip tray with overflow indicator'
    ],
    specifications: {
      'Pressure': '15 Bar',
      'Wattage': '1050 Watts',
      'Body': 'Brushed Stainless Steel',
      'Warranty': '2 Years Manufacturer Warranty'
    },
    reviews: [
      { id: 'rev-15', user: 'Rohit Bansal', rating: 5, date: '06 Oct 2026', comment: 'Crema is thick and velvety. Milk frother makes microfoam like Starbucks.', verified: true }
    ]
  },
  {
    id: 'prod-home-4',
    name: 'Prestige 3-Piece Heavy Gauge Cast Iron Skillet & Dosa Tawa Set',
    slug: 'prestige-heavy-cast-iron-skillet-tawa-set',
    brand: 'IronCraft',
    category: 'Home & Kitchen',
    subcategory: 'Cookware',
    price: 1999,
    originalPrice: 4499,
    discountPercent: 56,
    rating: 4.8,
    reviewCount: 2100,
    inStock: true,
    stockCount: 50,
    isFlashDeal: true,
    isTrending: false,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1584990347449-a6e507b94a8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Naturally non-stick cookware seasoned with 100% organic vegetable oil. Includes 10-inch skillet, 11-inch flat dosa tawa, and deep tadka pan. Adds beneficial dietary iron to everyday meals.',
    features: [
      '100% Pure Virgin Cast Iron with no chemical Teflon coatings',
      'Pre-seasoned with natural cold-pressed vegetable oil',
      'Compatible with Gas, Induction, Oven, and Campfire',
      'Superior heat retention for crispy dosas and seared paneer'
    ],
    specifications: {
      'Set Contains': '10" Skillet, 11" Dosa Tawa, 1 Tadka Pan',
      'Total Weight': '5.2 kg',
      'Induction Safe': 'Yes',
      'Warranty': 'Lifetime Guarantee against cracking'
    },
    reviews: [
      { id: 'rev-16', user: 'Meenakshi Sundaram', rating: 5, date: '15 Oct 2026', comment: 'Crispy paper dosas come out effortlessly! Truly healthy cookware.', verified: true }
    ]
  },

  // BEAUTY
  {
    id: 'prod-beau-1',
    name: 'GlowRadiance 10% Vitamin C + Hyaluronic Acid Brightening Face Serum (30ml)',
    slug: 'glowradiance-vitamin-c-brightening-face-serum',
    brand: 'DermaGlow',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 499,
    originalPrice: 999,
    discountPercent: 50,
    rating: 4.5,
    reviewCount: 6540,
    inStock: true,
    stockCount: 150,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f3932e6093?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fade dark spots, improve skin radiance, and lock in deep hydration. Formulated with stable Ethyl Ascorbic Acid, Ferulic Acid, and triple molecular hyaluronic acid. Dermatologically tested for all Indian skin types.',
    features: [
      '10% Pure Active Vitamin C + 1% Hyaluronic Acid',
      'Reduces dark spots, pigmentation, and acne marks',
      'Lightweight, non-sticky water gel texture',
      '100% Vegan, Paraben-Free, Fragrance-Free'
    ],
    specifications: {
      'Volume': '30 ml',
      'Skin Type': 'All Skin Types (including sensitive)',
      'Application': 'Day & Night after cleansing',
      'Expiry': '24 Months from MFG'
    },
    reviews: [
      { id: 'rev-17', user: 'Divya Khurana', rating: 5, date: '18 Oct 2026', comment: 'Saw visible fading of acne marks in 2 weeks. Absorbs in 5 seconds!', verified: true }
    ]
  },
  {
    id: 'prod-beau-2',
    name: 'Oud Royale Luxury Eau De Parfum for Men & Women (100ml)',
    slug: 'oud-royale-luxury-eau-de-parfum-100ml',
    brand: 'AromaCraft',
    category: 'Beauty',
    subcategory: 'Fragrances',
    price: 1299,
    originalPrice: 2999,
    discountPercent: 57,
    rating: 4.6,
    reviewCount: 1870,
    inStock: true,
    stockCount: 42,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An exotic oriental fragrance evoking aristocratic Indian palaces. Notes of smoky Cambodian oud, Damascena rose, warm amber, and golden vanilla. High concentration fragrance that lingers up to 14 hours.',
    features: [
      'Top Notes: Bulgarian Rose, Saffron, Cardamom',
      'Heart Notes: Cambodian Oud, Leather, Birch',
      'Base Notes: Amberwood, Madagascar Vanilla, White Musk',
      'Long-lasting EDP formula with 22% fragrance oil'
    ],
    specifications: {
      'Quantity': '100 ml spray',
      'Longevity': '12 - 14 Hours',
      'Gender': 'Unisex',
      'Origin': 'Handcrafted in Kannauj, India'
    },
    reviews: [
      { id: 'rev-18', user: 'Sameer Sheikh', rating: 5, date: '14 Oct 2026', comment: 'Rich, luxurious oud smell without being overpowering. Scent lasts on shirts until next morning.', verified: true }
    ]
  },
  {
    id: 'prod-beau-3',
    name: 'Gentleman Signature 6-in-1 Beard & Hair Grooming Kit',
    slug: 'gentleman-signature-beard-grooming-kit',
    brand: 'BeardCraft',
    category: 'Beauty',
    subcategory: 'Men Grooming',
    price: 899,
    originalPrice: 1999,
    discountPercent: 55,
    rating: 4.4,
    reviewCount: 3120,
    inStock: true,
    stockCount: 75,
    isFlashDeal: true,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Everything a modern gentleman needs for a neat, healthy beard and scalp. Includes organic beard growth oil, cedarwood balm, wooden neem comb, stainless steel trimming shears, and beard wash.',
    features: [
      'Formulated with Redensyl, Bhringraj, and Tea Tree oil',
      'Static-free pure neem wood wide-tooth comb',
      'Softens coarse beard hair and relieves itchiness',
      'Presented in a luxury magnetic gift box'
    ],
    specifications: {
      'Includes': 'Oil (50ml), Wash (100ml), Balm (50g), Comb, Scissors',
      'Natural Ingredients': '98.5% Organic Extracts',
      'Suitability': 'All beard lengths & skin types'
    },
    reviews: [
      { id: 'rev-19', user: 'Akash Dixit', rating: 4, date: '12 Oct 2026', comment: 'Neem comb is solid and the beard oil smells great with cedarwood notes.', verified: true }
    ]
  },

  // GROCERY
  {
    id: 'prod-groc-1',
    name: 'California Jumbo Almonds (1000g) - 100% Natural & Crunchy',
    slug: 'california-jumbo-almonds-1000g',
    brand: 'NutriBite Organics',
    category: 'Grocery',
    subcategory: 'Dry Fruits',
    price: 849,
    originalPrice: 1299,
    discountPercent: 35,
    rating: 4.7,
    reviewCount: 7890,
    inStock: true,
    stockCount: 200,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hand-selected premium California Badam packed with heart-healthy monounsaturated fats, protein, fiber, and Vitamin E. Vacuum-packed to retain natural freshness, sweetness, and nutty crunch.',
    features: [
      'Grade A Jumbo sized California Almonds',
      'Zero cholesterol and zero trans-fats',
      'Hygienically sorted and packed in resealable pouch',
      'Ideal for snacking, baking, and almond milk'
    ],
    specifications: {
      'Weight': '1 kg (1000 grams)',
      'Diet Type': 'Vegetarian, Gluten-Free, Keto-friendly',
      'Shelf Life': '12 Months'
    },
    reviews: [
      { id: 'rev-20', user: 'Preeti Aggarwal', rating: 5, date: '19 Oct 2026', comment: 'Very fresh and crispy. None of the almonds were bitter or shriveled. Worth every rupee.', verified: true }
    ]
  },
  {
    id: 'prod-groc-2',
    name: 'Himalayan Pure Organic Kashmiri Green Tea Loose Leaf (250g)',
    slug: 'himalayan-pure-organic-green-tea-250g',
    brand: 'Himalaya Sip',
    category: 'Grocery',
    subcategory: 'Beverages',
    price: 349,
    originalPrice: 599,
    discountPercent: 42,
    rating: 4.6,
    reviewCount: 2450,
    inStock: true,
    stockCount: 120,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Directly sourced from high-altitude misty valleys in Kashmir. Rich in catechins and polyphenols for natural detoxification and metabolism boost. Delicate floral aroma without any bitterness.',
    features: [
      'Whole leaf green tea with cardamom hints',
      '100% Certified Organic & Pesticide-Free',
      'Brew up to 100 cups per pack',
      'Natural immunity and weight management support'
    ],
    specifications: {
      'Weight': '250 grams',
      'Caffeine Level': 'Low',
      'Form': 'Loose Whole Leaves'
    },
    reviews: [
      { id: 'rev-21', user: 'Vandana Kulkarni', rating: 5, date: '13 Oct 2026', comment: 'So soothing and sweet without adding sugar. One spoon makes 3 refreshing cups.', verified: true }
    ]
  },
  {
    id: 'prod-groc-3',
    name: 'Mediterranean Cold-Pressed Extra Virgin Olive Oil (1 Litre)',
    slug: 'mediterranean-cold-pressed-olive-oil-1l',
    brand: 'OlioPure',
    category: 'Grocery',
    subcategory: 'Cooking Oils',
    price: 999,
    originalPrice: 1699,
    discountPercent: 41,
    rating: 4.7,
    reviewCount: 1670,
    inStock: true,
    stockCount: 65,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'First cold-pressed from early harvest Koroneiki olives within 6 hours of picking. Acidity below 0.3%. Features fruity herbaceous aromas, golden emerald hue, and a peppery polyphenol finish.',
    features: [
      'Acidity level < 0.3% (Super Premium Standard)',
      'Rich in antioxidants and Omega-9 Oleic Acid',
      'Dark glass UV-protective bottle',
      'Ideal for salads, pastas, dips, and light sauteing'
    ],
    specifications: {
      'Volume': '1 Litre',
      'Extraction': 'First Mechanical Cold-Pressing',
      'Packaging': 'Dark Emerald Glass Bottle'
    },
    reviews: [
      { id: 'rev-22', user: 'Aditi Mathur', rating: 5, date: '11 Oct 2026', comment: 'Authentic Mediterranean taste. Drizzled over pasta and salads, it tastes divine.', verified: true }
    ]
  },

  // SPORTS
  {
    id: 'prod-sport-1',
    name: 'ProStrike Grade-1 English Willow Tournament Cricket Bat (Full Size SH)',
    slug: 'prostrike-grade-1-english-willow-cricket-bat',
    brand: 'ProStrike Sports',
    category: 'Sports',
    subcategory: 'Cricket',
    price: 6999,
    originalPrice: 13999,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 1540,
    inStock: true,
    stockCount: 16,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crafted for power hitters and stroke players alike. Hand-selected Grade 1 English Willow with 7-9 straight grains, massive 40mm contoured edges, feather-light pick up balance, and multi-piece cane handle.',
    features: [
      'Grade 1 English Willow with massive sweet spot',
      '40mm thick edges and curved spine profile',
      '3-piece Singapore cane handle with rubber shock absorption',
      'Pre-knocked with padded full length bat cover'
    ],
    specifications: {
      'Size': 'Short Handle (Standard Men Full Size)',
      'Weight': '1160 - 1190 grams',
      'Grains': '7 to 9 Clear Straight Grains',
      'Warranty': '1 Year Handle Replacement Guarantee'
    },
    reviews: [
      { id: 'rev-23', user: 'Mayank Aggarwal', rating: 5, date: '16 Oct 2026', comment: 'Ping off the sweet spot is incredible! Hits sixes with minimal effort.', verified: true }
    ]
  },
  {
    id: 'prod-sport-2',
    name: 'FlexGrip Hexagonal Rubber Coated Dumbbells Pair (10kg x 2)',
    slug: 'flexgrip-hex-rubber-dumbbells-10kg-pair',
    brand: 'IronForge Fitness',
    category: 'Sports',
    subcategory: 'Gym & Fitness',
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.6,
    reviewCount: 3870,
    inStock: true,
    stockCount: 45,
    isFlashDeal: true,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 2,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Commercial grade solid cast iron core encased in heavy-duty natural virgin rubber. Hexagonal anti-roll design protects home flooring and reduces noise during drops. Ergonomic knurled chrome grip.',
    features: [
      'Includes Pair: Two 10kg dumbbells (Total 20kg)',
      'Anti-roll hexagon ends for safe push-up renegade rows',
      'Odor-free heavy-duty impact rubber coating',
      'Knurled chrome steel handle for non-slip grip'
    ],
    specifications: {
      'Weight': '20 kg (2 x 10kg)',
      'Material': 'Cast Iron core + Rubber outer + Chrome handle',
      'Warranty': '2 Years Structural Warranty'
    },
    reviews: [
      { id: 'rev-24', user: 'Chetan Bhagat', rating: 5, date: '15 Oct 2026', comment: 'Heavy, durable, zero rubber smell. Perfect for home workouts.', verified: true }
    ]
  },
  {
    id: 'prod-sport-3',
    name: 'ZenAsana Eco-Friendly Non-Slip TPE Yoga Mat 6mm with Carrying Strap',
    slug: 'zenasana-eco-friendly-yoga-mat-6mm',
    brand: 'ZenAsana',
    category: 'Sports',
    subcategory: 'Yoga & Pilates',
    price: 799,
    originalPrice: 1899,
    discountPercent: 58,
    rating: 4.5,
    reviewCount: 4320,
    inStock: true,
    stockCount: 88,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: false,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Align your chakras with comfort and stability. Double-layer dual-tone TPE material provides high-density 6mm joint cushioning and laser-printed posture alignment guides. Sweat-proof and easy to wipe clean.',
    features: [
      '6mm optimal joint cushioning for knees and spine',
      'Dual textured surfaces for anti-slip grip on tile and wood floors',
      'Body alignment guidelines printed for proper form',
      'Free durable shoulder sling carrying strap'
    ],
    specifications: {
      'Dimensions': '72 x 24 inches (183cm x 61cm)',
      'Thickness': '6 mm',
      'Material': 'Eco-Friendly Biodegradable TPE'
    },
    reviews: [
      { id: 'rev-25', user: 'Pallavi Rao', rating: 5, date: '09 Oct 2026', comment: 'Does not slip at all during sweaty Vinyasa flows! 6mm thickness protects knees.', verified: true }
    ]
  },

  // ACCESSORIES
  {
    id: 'prod-acc-1',
    name: 'UrbanShield 15.6-inch Waterproof Anti-Theft Laptop Backpack with USB Port',
    slug: 'urbanshield-waterproof-anti-theft-laptop-backpack',
    brand: 'UrbanCraft',
    category: 'Accessories',
    subcategory: 'Bags & Luggage',
    price: 1399,
    originalPrice: 3499,
    discountPercent: 60,
    rating: 4.6,
    reviewCount: 4890,
    inStock: true,
    stockCount: 90,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for daily urban commuters and tech travelers. Hidden rear security zippers, water-repellent ballistic nylon shell, dedicated padded pocket for 15.6" laptop and tablet, and external USB charging port.',
    features: [
      'Anti-theft hidden zipper design facing your back',
      'External USB pass-through port for power banks',
      'Water-repellent scratch-resistant 900D Oxford fabric',
      'Breathable honeycomb mesh back padding and luggage strap'
    ],
    specifications: {
      'Capacity': '28 Litres',
      'Laptop Compatibility': 'Up to 15.6 inches',
      'Weight': '680 grams',
      'Warranty': '1 Year Replacement Warranty'
    },
    reviews: [
      { id: 'rev-26', user: 'Aman Saxena', rating: 5, date: '18 Oct 2026', comment: 'Carried it in Mumbai monsoon rain, everything inside remained 100% dry. Pockets are well thought out.', verified: true }
    ]
  },
  {
    id: 'prod-acc-2',
    name: 'VoltCharge MagSafe 10000mAh 22.5W Fast Charging Power Bank',
    slug: 'voltcharge-magsafe-10000mah-power-bank',
    brand: 'VoltCharge',
    category: 'Accessories',
    subcategory: 'Mobile Accessories',
    price: 1599,
    originalPrice: 3299,
    discountPercent: 52,
    rating: 4.5,
    reviewCount: 3210,
    inStock: true,
    stockCount: 65,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: true,
    isRecommended: true,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1609592424300-e2b26aa571c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Snap on and charge wirelessly on the go. Equipped with 15W MagSafe magnetic wireless charging, 22.5W PD Type-C fast output, LED battery level indicator, and multi-layer temperature and short-circuit protection.',
    features: [
      '10,000 mAh Li-Polymer high density cells',
      '15W Fast Magnetic Wireless + 22.5W Wired PD Output',
      'Charge up to 3 devices simultaneously',
      'Pocket-friendly slim profile (only 16mm thick)'
    ],
    specifications: {
      'Battery Capacity': '10,000 mAh',
      'Output Ports': '1x USB-C PD, 1x USB-A QC 3.0, Wireless Pad',
      'Weight': '195 grams',
      'Warranty': '1 Year Domestic Warranty'
    },
    reviews: [
      { id: 'rev-27', user: 'Nitin Pandey', rating: 4, date: '14 Oct 2026', comment: 'Snaps strongly to back of iPhone and charges quickly. Compact size.', verified: true }
    ]
  },
  {
    id: 'prod-acc-3',
    name: 'Vintage Crafter RFID-Blocking Top Grain Genuine Leather Wallet for Men',
    slug: 'vintage-crafter-rfid-genuine-leather-wallet',
    brand: 'Vintage Crafter',
    category: 'Accessories',
    subcategory: 'Wallets',
    price: 699,
    originalPrice: 1999,
    discountPercent: 65,
    rating: 4.7,
    reviewCount: 5410,
    inStock: true,
    stockCount: 130,
    isFlashDeal: true,
    isTrending: false,
    isBestSeller: true,
    isRecommended: false,
    freeDelivery: true,
    deliveryDays: 1,
    sgAssured: true,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606503829059-994c65751939?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted from 100% genuine top-grain oil pull-up leather that develops a rich vintage patina with time. Built-in military-grade RFID blocking liner shields your cards against electronic pickpocketing.',
    features: [
      '100% Genuine Full-Grain Hunter Leather',
      'Certified RFID Blocking Layer against 13.56 MHz scans',
      '8 Card slots, 2 Hidden currency compartments, 1 ID window & coin pouch',
      'Comes in a matte black luxury gift presentation box'
    ],
    specifications: {
      'Material': 'Genuine Top-Grain Cowhide Leather',
      'Dimensions': '11.5 cm x 9.5 cm x 1.8 cm',
      'Color': 'Vintage Teak Brown',
      'Warranty': '6 Months Warranty against manufacturing defects'
    },
    reviews: [
      { id: 'rev-28', user: 'Gaurav Singhal', rating: 5, date: '17 Oct 2026', comment: 'Real leather smell! Feels soft in hand and fits all my credit cards easily.', verified: true }
    ]
  }
];

export const CATEGORIES = [
  { id: 'cat-all', name: 'All Products', slug: 'all', icon: 'LayoutGrid' },
  { id: 'cat-elec', name: 'Electronics', slug: 'electronics', icon: 'Smartphone', desc: 'Smartphones, Laptops, Audio & Wearables', count: 5 },
  { id: 'cat-fash', name: 'Fashion', slug: 'fashion', icon: 'Shirt', desc: 'Ethnic Wear, Western, Footwear & Outerwear', count: 4 },
  { id: 'cat-home', name: 'Home & Kitchen', slug: 'home-kitchen', icon: 'Home', desc: 'Smart Appliances, Cookware & Vacuum Cleaners', count: 4 },
  { id: 'cat-beau', name: 'Beauty', slug: 'beauty', icon: 'Sparkles', desc: 'Skincare, Perfumes, Men Grooming', count: 3 },
  { id: 'cat-groc', name: 'Grocery', slug: 'grocery', icon: 'Apple', desc: 'Dry Fruits, Kashmiri Tea & Organic Oils', count: 3 },
  { id: 'cat-spor', name: 'Sports', slug: 'sports', icon: 'Trophy', desc: 'Cricket Willow, Dumbbells & Yoga Mats', count: 3 },
  { id: 'cat-acce', name: 'Accessories', slug: 'accessories', icon: 'Watch', desc: 'Bags, Magsafe Powerbanks & RFID Wallets', count: 3 }
];

export const HERO_BANNERS = [
  {
    id: 'banner-1',
    headline: 'SGKart Mega Saver Festival',
    subheadline: 'Up to 70% Off on Top Brands + Instant 10% Bank Discount',
    ctaText: 'Explore Mega Deals',
    ctaLink: '/products?filter=flash',
    tag: 'FESTIVE SPECIAL',
    badgeColor: 'bg-secondary text-navy font-bold',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-[#174EA6] via-[#103778] to-[#0A224E]'
  },
  {
    id: 'banner-2',
    headline: 'Next-Gen Smartphones & Audio',
    subheadline: 'True 5G Performance, 120Hz Displays & ANC Starting ₹1,499',
    ctaText: 'Shop Electronics',
    ctaLink: '/category/electronics',
    tag: 'NEW ARRIVALS',
    badgeColor: 'bg-emerald-500 text-white font-bold',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-[#0D3578] via-[#174EA6] to-[#2563EB]'
  },
  {
    id: 'banner-3',
    headline: 'Royal Indian Festive Collection',
    subheadline: 'Handcrafted Banarasi Sarees, Embroidered Kurtas & Luxury Footwear',
    ctaText: 'Discover Fashion',
    ctaLink: '/category/fashion',
    tag: 'TRENDING FASHION',
    badgeColor: 'bg-amber-400 text-navy font-bold',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6]'
  }
];

export const PROMO_STRIPS = [
  {
    id: 'promo-1',
    title: 'Instant 10% Off on HDFC & ICICI Bank Cards',
    code: 'BANK10',
    validity: 'Valid on orders above ₹2,499'
  },
  {
    id: 'promo-2',
    title: 'Flat ₹200 SG Cash on First Order',
    code: 'WELCOME200',
    validity: 'Use code at checkout'
  },
  {
    id: 'promo-3',
    title: 'Free Express Delivery with SG Assured',
    code: 'FASTSG',
    validity: 'Guaranteed 2-day delivery across India'
  }
];
