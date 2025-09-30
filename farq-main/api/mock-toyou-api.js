const mockRestaurantsData = require('./mock-restaurants-data');

class MockToYouAPI {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  async searchMerchant(name) {
    console.log(`🎭 Mock ToYouAPI: Searching for "${name}"`);

    const allMerchants = mockRestaurantsData.getMockToYouMerchants();

    const results = allMerchants.filter(merchant => {
      const merchantName = merchant.name.toLowerCase();
      const searchName = name.toLowerCase();
      return merchantName.includes(searchName) || searchName.includes(merchantName);
    });

    return results.slice(0, 5);
  }

  findBestMatch(searchName, merchants) {
    if (!merchants || merchants.length === 0) return null;

    const normalizedSearch = searchName.toLowerCase().trim();

    for (const merchant of merchants) {
      const normalizedMerchant = merchant.name.toLowerCase().trim();

      if (normalizedMerchant === normalizedSearch) {
        return merchant;
      }
    }

    for (const merchant of merchants) {
      const normalizedMerchant = merchant.name.toLowerCase().trim();

      if (normalizedMerchant.includes(normalizedSearch) ||
          normalizedSearch.includes(normalizedMerchant)) {
        return merchant;
      }
    }

    return merchants[0];
  }

  getDeliveryFee(merchant) {
    if (!merchant) return null;
    return merchant.deliveryFee || (Math.random() * 18 + 5).toFixed(0);
  }
}

module.exports = MockToYouAPI;
