const mockRestaurantsData = require('./mock-restaurants-data');

class MockChefzAPI {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  async testConnection() {
    return true;
  }

  rotateUserAgent() {
    console.log('🔄 Mock API: User agent rotated (simulated)');
  }

  async collectChefsUntilTarget(page = 2, maxChefs = 6, position = 0) {
    console.log(`🎭 Mock ChefzAPI: Collecting ${maxChefs} chefs from page ${page}, position ${position}`);

    const allChefs = mockRestaurantsData.getMockChefs();
    const startIndex = (page - 1) * 20 + position;
    const endIndex = Math.min(startIndex + maxChefs, allChefs.length);

    const selectedChefs = allChefs.slice(startIndex, endIndex);

    return {
      chefs: selectedChefs,
      totalCollected: selectedChefs.length,
      pagesScanned: 1,
      lastPage: page,
      nextPage: page,
      nextPosition: position + selectedChefs.length,
      lastChef: selectedChefs[selectedChefs.length - 1] || null
    };
  }

  async processSingleChef(chef) {
    if (!chef) return null;

    const deliveryFee = chef.mockDeliveryFee || (Math.random() * 15 + 3).toFixed(2);
    const totalPrice = (parseFloat(deliveryFee) + 50 + Math.random() * 30).toFixed(2);

    return {
      delivery_fee: deliveryFee.toString(),
      total_price: totalPrice
    };
  }
}

module.exports = MockChefzAPI;
