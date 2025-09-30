const mockChefs = [
  {
    id: 1001,
    branchId: 1001,
    name: "Golden Spoon Restaurant",
    avgReview: 4.6,
    reviewCount: 1247,
    distance: 1.2,
    cuisine: [
      { name: "Arabic" },
      { name: "Grill" }
    ],
    profilePicture: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "25-35mins",
    mockDeliveryFee: "8.00"
  },
  {
    id: 1002,
    branchId: 1002,
    name: "Pasta Palace",
    avgReview: 4.4,
    reviewCount: 892,
    distance: 2.5,
    cuisine: [
      { name: "Italian" },
      { name: "Pasta" }
    ],
    profilePicture: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "30-40mins",
    mockDeliveryFee: "12.00"
  },
  {
    id: 1003,
    branchId: 1003,
    name: "Sushi World",
    avgReview: 4.8,
    reviewCount: 2134,
    distance: 0.8,
    cuisine: [
      { name: "Asian" },
      { name: "Japanese" },
      { name: "Seafood" }
    ],
    profilePicture: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "20-30mins",
    mockDeliveryFee: "6.00"
  },
  {
    id: 1004,
    branchId: 1004,
    name: "Taco Fiesta",
    avgReview: 4.3,
    reviewCount: 567,
    distance: 3.1,
    cuisine: [
      { name: "Mexican" },
      { name: "Fast Food" }
    ],
    profilePicture: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "35-45mins",
    mockDeliveryFee: "14.00"
  },
  {
    id: 1005,
    branchId: 1005,
    name: "Green Leaf Healthy Kitchen",
    avgReview: 4.7,
    reviewCount: 1456,
    distance: 1.5,
    cuisine: [
      { name: "Healthy" },
      { name: "Salads" },
      { name: "Vegan" }
    ],
    profilePicture: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "20-30mins",
    mockDeliveryFee: "7.00"
  },
  {
    id: 1006,
    branchId: 1006,
    name: "BBQ Masters Grill House",
    avgReview: 4.5,
    reviewCount: 978,
    distance: 2.8,
    cuisine: [
      { name: "Grill" },
      { name: "American" }
    ],
    profilePicture: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "30-40mins",
    mockDeliveryFee: "11.00"
  },
  {
    id: 1007,
    branchId: 1007,
    name: "Dragon Wok Chinese Cuisine",
    avgReview: 4.2,
    reviewCount: 723,
    distance: 4.2,
    cuisine: [
      { name: "Asian" },
      { name: "Chinese" }
    ],
    profilePicture: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "40-50mins",
    mockDeliveryFee: "15.00"
  },
  {
    id: 1008,
    branchId: 1008,
    name: "Royal Shawarma Corner",
    avgReview: 4.6,
    reviewCount: 1834,
    distance: 0.5,
    cuisine: [
      { name: "Arabic" },
      { name: "Shawarma" },
      { name: "Fast Food" }
    ],
    profilePicture: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "15-25mins",
    mockDeliveryFee: "4.00"
  },
  {
    id: 1009,
    branchId: 1009,
    name: "Ocean Breeze Seafood",
    avgReview: 4.4,
    reviewCount: 645,
    distance: 3.5,
    cuisine: [
      { name: "Seafood" },
      { name: "Fish" }
    ],
    profilePicture: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "35-45mins",
    mockDeliveryFee: "13.00"
  },
  {
    id: 1010,
    branchId: 1010,
    name: "Pizza Paradise",
    avgReview: 4.3,
    reviewCount: 1123,
    distance: 2.0,
    cuisine: [
      { name: "Italian" },
      { name: "Pizza" },
      { name: "Fast Food" }
    ],
    profilePicture: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "25-35mins",
    mockDeliveryFee: "9.00"
  },
  {
    id: 1011,
    branchId: 1011,
    name: "Curry House India",
    avgReview: 4.7,
    reviewCount: 1567,
    distance: 1.8,
    cuisine: [
      { name: "Indian" },
      { name: "Asian" },
      { name: "Curry" }
    ],
    profilePicture: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "25-35mins",
    mockDeliveryFee: "10.00"
  },
  {
    id: 1012,
    branchId: 1012,
    name: "Burger Boulevard",
    avgReview: 4.1,
    reviewCount: 834,
    distance: 2.3,
    cuisine: [
      { name: "Burger" },
      { name: "Fast Food" },
      { name: "American" }
    ],
    profilePicture: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "20-30mins",
    mockDeliveryFee: "8.00"
  },
  {
    id: 1013,
    branchId: 1013,
    name: "Mediterranean Delights",
    avgReview: 4.5,
    reviewCount: 912,
    distance: 2.7,
    cuisine: [
      { name: "Mediterranean" },
      { name: "Greek" },
      { name: "Healthy" }
    ],
    profilePicture: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "30-40mins",
    mockDeliveryFee: "11.00"
  },
  {
    id: 1014,
    branchId: 1014,
    name: "Thai Orchid Kitchen",
    avgReview: 4.6,
    reviewCount: 1089,
    distance: 3.0,
    cuisine: [
      { name: "Asian" },
      { name: "Thai" }
    ],
    profilePicture: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "30-40mins",
    mockDeliveryFee: "12.00"
  },
  {
    id: 1015,
    branchId: 1015,
    name: "Fresh Sandwich Hub",
    avgReview: 4.2,
    reviewCount: 456,
    distance: 1.1,
    cuisine: [
      { name: "Sandwich" },
      { name: "Fast Food" }
    ],
    profilePicture: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "15-25mins",
    mockDeliveryFee: "5.00"
  },
  {
    id: 1016,
    branchId: 1016,
    name: "Flame Kebab House",
    avgReview: 4.4,
    reviewCount: 789,
    distance: 2.1,
    cuisine: [
      { name: "Arabic" },
      { name: "Grill" },
      { name: "Turkish" }
    ],
    profilePicture: "https://images.pexels.com/photos/3789885/pexels-photo-3789885.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "25-35mins",
    mockDeliveryFee: "9.00"
  },
  {
    id: 1017,
    branchId: 1017,
    name: "Seoul Street Food",
    avgReview: 4.7,
    reviewCount: 1345,
    distance: 3.3,
    cuisine: [
      { name: "Asian" },
      { name: "Korean" }
    ],
    profilePicture: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "35-45mins",
    mockDeliveryFee: "14.00"
  },
  {
    id: 1018,
    branchId: 1018,
    name: "Biryani Palace",
    avgReview: 4.8,
    reviewCount: 2234,
    distance: 1.4,
    cuisine: [
      { name: "Indian" },
      { name: "Asian" },
      { name: "Rice" }
    ],
    profilePicture: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "20-30mins",
    mockDeliveryFee: "7.00"
  },
  {
    id: 1019,
    branchId: 1019,
    name: "French Bistro Le Petit",
    avgReview: 4.6,
    reviewCount: 567,
    distance: 4.5,
    cuisine: [
      { name: "French" },
      { name: "European" }
    ],
    profilePicture: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "40-50mins",
    mockDeliveryFee: "16.00"
  },
  {
    id: 1020,
    branchId: 1020,
    name: "Crispy Fried Chicken Co.",
    avgReview: 4.3,
    reviewCount: 1678,
    distance: 1.9,
    cuisine: [
      { name: "Chicken" },
      { name: "Fast Food" }
    ],
    profilePicture: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400",
    delivery_time_range: "20-30mins",
    mockDeliveryFee: "8.00"
  }
];

const mockToYouMerchants = [
  {
    id: "toy-1001",
    name: "Golden Spoon Restaurant",
    rating: 4.6,
    deliveryFee: 10,
    logoImage: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1002",
    name: "Pasta Palace",
    rating: 4.5,
    deliveryFee: 14,
    logoImage: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1003",
    name: "Sushi World",
    rating: 4.7,
    deliveryFee: 8,
    logoImage: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1004",
    name: "Taco Fiesta",
    rating: 4.2,
    deliveryFee: 16,
    logoImage: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1005",
    name: "Green Leaf Healthy Kitchen",
    rating: 4.8,
    deliveryFee: 9,
    logoImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1006",
    name: "BBQ Masters Grill House",
    rating: 4.4,
    deliveryFee: 13,
    logoImage: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1007",
    name: "Dragon Wok Chinese Cuisine",
    rating: 4.3,
    deliveryFee: 17,
    logoImage: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1008",
    name: "Royal Shawarma Corner",
    rating: 4.7,
    deliveryFee: 5,
    logoImage: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1009",
    name: "Ocean Breeze Seafood",
    rating: 4.5,
    deliveryFee: 15,
    logoImage: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1010",
    name: "Pizza Paradise",
    rating: 4.2,
    deliveryFee: 11,
    logoImage: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1011",
    name: "Curry House India",
    rating: 4.6,
    deliveryFee: 12,
    logoImage: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1012",
    name: "Burger Boulevard",
    rating: 4.0,
    deliveryFee: 9,
    logoImage: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1013",
    name: "Mediterranean Delights",
    rating: 4.6,
    deliveryFee: 13,
    logoImage: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1014",
    name: "Thai Orchid Kitchen",
    rating: 4.7,
    deliveryFee: 14,
    logoImage: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1015",
    name: "Fresh Sandwich Hub",
    rating: 4.3,
    deliveryFee: 6,
    logoImage: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1016",
    name: "Flame Kebab House",
    rating: 4.5,
    deliveryFee: 10,
    logoImage: "https://images.pexels.com/photos/3789885/pexels-photo-3789885.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/3789885/pexels-photo-3789885.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1017",
    name: "Seoul Street Food",
    rating: 4.8,
    deliveryFee: 16,
    logoImage: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1018",
    name: "Biryani Palace",
    rating: 4.9,
    deliveryFee: 8,
    logoImage: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1019",
    name: "French Bistro Le Petit",
    rating: 4.5,
    deliveryFee: 18,
    logoImage: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  },
  {
    id: "toy-1020",
    name: "Crispy Fried Chicken Co.",
    rating: 4.4,
    deliveryFee: 9,
    logoImage: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=200",
    backgroundImage: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600",
    isClosed: false
  }
];

module.exports = {
  getMockChefs: () => mockChefs,
  getMockToYouMerchants: () => mockToYouMerchants
};
