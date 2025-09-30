const axios = require('axios');

class ToYouAPI {
  constructor(latitude, longitude) {
    this.baseUrl = 'https://app.toyou.delivery';
    this.lat = latitude;
    this.lng = longitude;
    this.operationArea = 'SA_Riyadh';

    // Load tokens from environment
    this.authToken = process.env.TOYOU_AUTH_TOKEN;
    this.refreshToken = process.env.TOYOU_REFRESH_TOKEN;
    this.authExpirationDate = process.env.TOYOU_AUTH_EXPIRATION_DATE;
    this.refreshExpirationDate = process.env.TOYOU_REFRESH_EXPIRATION_DATE;
    this.authExpirationPeriod = process.env.TOYOU_AUTH_EXPIRATION_PERIOD;
    this.refreshExpirationPeriod = process.env.TOYOU_REFRESH_EXPIRATION_PERIOD;
  }

  extractEnglishName(merchantName) {
    const parts = merchantName.split(' | ');
    if (parts.length > 1) {
      return parts[0].trim();
    }

    const dashParts = merchantName.split(' - ');
    if (dashParts.length > 1) {
      return dashParts[0].trim();
    }

    const words = merchantName.split(' ');
    const englishWords = words.filter(word =>
      /[a-zA-Z]/.test(word)
    );

    const result = englishWords.join(' ') || merchantName;
    return result.replace(/🇸🇦|🌞🌊/g, '').trim();
  }

  async searchMerchant(merchantName) {
    const englishName = this.extractEnglishName(merchantName);
    console.log(`🔍 Searching for '${englishName}' in ToYou...`);

    const url = `${this.baseUrl}/search/v12/c3-search`;
    const params = {
      lat: this.lat,
      lon: this.lng,
      query: englishName,
      operationArea: this.operationArea
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Accept-Language': 'ar',
      'Ty-Distinct-Id': '02e00d2c-7d17-43be-a592-9db99c85b05b',
      'Ty-Installation-Id': '4EB650CC-B850-47B5-8E3C-7F29C97CED24',
      'User-Agent': 'com.arammeem.toyou.ios/2.35(25458) (iOS; 18.5; Apple)',
      'Accept-Encoding': 'gzip, deflate'
    };

    try {
      const response = await axios.get(url, { params, headers });
      console.log(`📡 GET /search/v12/c3-search - Status: ${response.status}`);

      const data = response.data;
      const merchants = [];

      if (data.c3?.blocks) {
        for (const block of data.c3.blocks) {
          if (block.kind === 'GRID' && block.items) {
            for (const item of block.items) {
              if (item.kind === 'MERCHANT' && item.merchant) {
                merchants.push(item.merchant);
              }
            }
          }
        }
      }

      console.log(`✅ Found ${merchants.length} merchants in ToYou search`);
      return merchants;

    } catch (error) {
      console.error('❌ Error searching in ToYou:', error.message);
      return [];
    }
  }

  findBestMatch(chefzName, toyouMerchants) {
    if (!toyouMerchants || toyouMerchants.length === 0) {
      return null;
    }

    const chefzEnglish = this.extractEnglishName(chefzName).toLowerCase().trim();

    // Exact match
    for (const merchant of toyouMerchants) {
      const toyouEnglish = this.extractEnglishName(merchant.name || '').toLowerCase().trim();
      if (chefzEnglish === toyouEnglish) {
        console.log(`✅ Exact match found: ${merchant.name}`);
        return merchant;
      }
    }

    // Partial match
    for (const merchant of toyouMerchants) {
      const toyouEnglish = this.extractEnglishName(merchant.name || '').toLowerCase().trim();
      if (chefzEnglish.includes(toyouEnglish) || toyouEnglish.includes(chefzEnglish)) {
        console.log(`✅ Partial match found: ${merchant.name}`);
        return merchant;
      }
    }

    // Return first result if no good match
    console.log(`⚠️ No match found, using first result: ${toyouMerchants[0].name}`);
    return toyouMerchants[0];
  }

  getDeliveryFee(merchant) {
    if (merchant.fees?.delivery) {
      return merchant.fees.delivery;
    }
    if (merchant.delivery?.fees?.delivery) {
      return merchant.delivery.fees.delivery;
    }
    return null;
  }
}

module.exports = ToYouAPI;