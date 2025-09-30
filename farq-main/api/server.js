require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ChefzAPI = require('./chefz-api');
const ToYouAPI = require('./toyou-api');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(morgan('combined'));
app.use(express.json());

let requestQueue = [];
let processing = false;

const processDeliveryComparison = async (latitude, longitude, maxChefs = 6, page = 2, position = 0) => {
  console.log(`🚀 Starting delivery comparison for lat=${latitude}, lng=${longitude}, starting from page=${page}, position=${position}`);

  const chefzAPI = new ChefzAPI(latitude, longitude);
  const toyouAPI = new ToYouAPI(latitude, longitude);

  // Test connection to TheChefz API first
  const connectionTest = await chefzAPI.testConnection();
  if (!connectionTest) {
    console.log('❌ TheChefz API connection failed, trying with different user agent...');
    chefzAPI.rotateUserAgent();
    const retryTest = await chefzAPI.testConnection();
    if (!retryTest) {
      throw new Error('TheChefz API is not accessible. Please check authentication tokens or try again later.');
    }
  }

  try {
    // Collect chefs across multiple pages until we reach the target
    const collectionResult = await chefzAPI.collectChefsUntilTarget(page, maxChefs, position);

    if (collectionResult.totalCollected === 0) {
      throw new Error('No chefs found in TheChefz');
    }

    console.log(`📊 Collected ${collectionResult.totalCollected} chefs from ${collectionResult.pagesScanned} pages`);

    const results = [];

    for (let i = 0; i < collectionResult.chefs.length; i++) {
      const chef = collectionResult.chefs[i];
      const chefName = chef.name || 'Unknown';
      const chefId = chef.branchId || chef.id;

      console.log(`\n🍽️ Chef ${i + 1}/${collectionResult.chefs.length}: ${chefName}`);

      // Debug: Log chef details
      console.log('🔍 Chef Details:', JSON.stringify(chef, null, 2));

      // Get delivery fee from TheChefz
      const chefResult = await chefzAPI.processSingleChef(chef);

      let chefzDeliveryFee = null;
      let chefzTotalPrice = null;
      if (chefResult) {
        chefzDeliveryFee = chefResult.delivery_fee;
        chefzTotalPrice = chefResult.total_price;
        console.log(`✅ TheChefz: Delivery = ${chefzDeliveryFee} SAR, Total = ${chefzTotalPrice} SAR`);
      }

      // Search in ToYou
      const toyouMerchants = await toyouAPI.searchMerchant(chefName);

      let toyouDeliveryFee = null;
      let toyouMerchantName = null;
      let toyouMerchantId = null;
      let bestMatch = null;

      if (toyouMerchants.length > 0) {
        bestMatch = toyouAPI.findBestMatch(chefName, toyouMerchants);
        if (bestMatch) {
          toyouMerchantName = bestMatch.name;
          toyouMerchantId = bestMatch.id;
          toyouDeliveryFee = toyouAPI.getDeliveryFee(bestMatch);
          console.log(`✅ ToYou: ${toyouMerchantName} - Delivery = ${toyouDeliveryFee} SAR`);

          // Debug: Log ToYou merchant details
          console.log('🔍 ToYou Match Details:', JSON.stringify(bestMatch, null, 2));
        }
      } else {
        console.log('❌ No merchants found in ToYou search');
      }

      // Create restaurant object in the requested format
      const restaurant = {
        name: chefName,
        rating: parseFloat(chef.avgReview) || 0,
        distance: chef.distance ? `${chef.distance}km` : "N/A",
        tags: chef.cuisine ? chef.cuisine.map(c => c.name) : ["Restaurant"],
        image: chef.profilePicture || "",
        reviewCount: chef.reviewCount || 0,
        isClosed: false, // Default from TheChefz
        deliveryOptions: []
      };

      // If we found a ToYou match, enhance with ToYou data
      if (toyouMerchantName && bestMatch) {
        // Use ToYou's background image if available
        if (bestMatch.backgroundImage && !restaurant.image) {
          restaurant.image = bestMatch.backgroundImage;
        }

        // Add ToYou logo as additional data
        if (bestMatch.logoImage) {
          restaurant.toyouLogo = bestMatch.logoImage;
        }

        // Use ToYou rating as fallback if TheChefz rating is 0
        if (restaurant.rating === 0 && bestMatch.rating) {
          restaurant.rating = parseFloat(bestMatch.rating) || 0;
        }

        // Update closed status from ToYou if available
        if (bestMatch.isClosed !== undefined) {
          restaurant.isClosed = bestMatch.isClosed;
        }
      }

      // Add TheChefz delivery option
      if (chefzDeliveryFee) {
        restaurant.deliveryOptions.push({
          name: "The Chefz",
          time: chef.delivery_time_range || "20-30mins",
          price: chefzDeliveryFee,
          isFree: parseFloat(chefzDeliveryFee) === 0,
          image: "/delivery_logos/the-chefs.png"
        });
      }

      // Add ToYou delivery option
      if (toyouDeliveryFee && toyouMerchantName) {
        restaurant.deliveryOptions.push({
          name: "To You",
          time: "25-35mins", // Default time for ToYou
          price: toyouDeliveryFee.toString(),
          isFree: parseFloat(toyouDeliveryFee) === 0,
          image: "/delivery_logos/to-you.png"
        });
      }

      results.push(restaurant);

      // Wait between requests
      if (i < collectionResult.chefs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    console.log(`✅ Processing completed: ${results.length} chefs processed`);

    return {
      restaurants: results,
      pagination: {
        startPage: page,
        startPosition: position,
        lastPage: collectionResult.lastPage,
        lastChef: collectionResult.lastChef,
        totalCollected: collectionResult.totalCollected,
        pagesScanned: collectionResult.pagesScanned,
        nextPage: collectionResult.nextPage,
        nextPosition: collectionResult.nextPosition
      }
    };

  } catch (error) {
    console.error('❌ Error in delivery comparison:', error.message);
    throw error;
  }
};

const processQueue = async () => {
  if (processing || requestQueue.length === 0) return;

  processing = true;
  const request = requestQueue.shift();

  try {
    const { latitude, longitude, maxChefs, page, position = 0 } = request.data;
    const comparisonResult = await processDeliveryComparison(latitude, longitude, maxChefs, page, position);
    request.resolve({
      status: 'completed',
      processed_at: new Date().toISOString(),
      restaurants: comparisonResult.restaurants,
      total_processed: comparisonResult.restaurants.length,
      pagination: comparisonResult.pagination,
      next_request: {
        page: comparisonResult.pagination.nextPage,
        position: comparisonResult.pagination.nextPosition
      },
      last_restaurant: comparisonResult.pagination.lastChef ? {
        id: comparisonResult.pagination.lastChef.branchId || comparisonResult.pagination.lastChef.id,
        name: comparisonResult.pagination.lastChef.name
      } : null
    });
  } catch (error) {
    request.reject(error);
  } finally {
    processing = false;
    processQueue();
  }
};

app.post('/compare', (req, res) => {
  const { latitude, longitude, maxChefs = 6, page = 2, position = 0 } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({
      error: 'Latitude and longitude are required'
    });
  }

  console.log(`📍 New comparison request: lat=${latitude}, lng=${longitude}, maxChefs=${maxChefs}, page=${page}, position=${position}`);

  return new Promise((resolve, reject) => {
    requestQueue.push({
      data: { latitude, longitude, maxChefs, page, position },
      resolve,
      reject
    });
    processQueue();
  })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }));
});


app.get('/queue-status', (req, res) => {
  res.json({
    queue_length: requestQueue.length,
    processing: processing,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Endpoints:');
  console.log('  POST /compare - Compare delivery fees (requires lat, lng, optional maxChefs, page, position)');
  console.log('  GET /queue-status - Check queue status');
});