import { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import BestOfferModal from '../components/BestOfferModal';
import LoadingModal from '../components/LoadingModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { RestaurantService, type NextRequest } from '../services/restaurantService';
import type { Restaurant } from '../types/restaurant';
import dummyData from '../data/dummyRestaurants.json';


type SortOption = 'distance' | 'price' | 'rating';

export default function DeliveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextRequest, setNextRequest] = useState<NextRequest | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showBestOfferModal, setShowBestOfferModal] = useState(false);
  const { t } = useLanguage();
  const { userLocation } = useLocation();

  // Check if we have test param or are on /test route
  const isTestMode = new URLSearchParams(window.location.search).has('test') ||
                     window.location.pathname === '/test';

  // Fetch restaurants from API or dummy data
  const fetchRestaurants = async (latitude: number, longitude: number, reset = true) => {
    setLoading(reset);
    setError(null);

    try {
      // Use dummy data if test param is present
      if (isTestMode) {
        // Simulate loading time for dummy data
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (reset) {
          setRestaurants(dummyData.restaurants as Restaurant[]);
        } else {
          setRestaurants(prev => [...prev, ...dummyData.restaurants as Restaurant[]]);
        }
        setHasMore(false); // No more data to load for dummy
        setNextRequest(null);
        return;
      }

      const result = await RestaurantService.fetchRestaurants({
        latitude,
        longitude,
        maxChefs: 6,
        page: 2,
        position: 0
      });

      if (reset) {
        setRestaurants(result.restaurants);
      } else {
        setRestaurants(prev => [...prev, ...result.restaurants]);
      }

      setNextRequest(result.nextRequest);
      setHasMore(result.hasMore);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load restaurants. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load more restaurants using next_request
  const loadMoreRestaurants = async () => {
    if (!nextRequest || loadingMore || !userLocation) return;

    // Skip load more for test data
    if (isTestMode) return;

    setLoadingMore(true);
    setError(null);

    try {
      const result = await RestaurantService.fetchRestaurants({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        maxChefs: 6,
        page: nextRequest.page,
        position: nextRequest.position
      });

      setRestaurants(prev => [...prev, ...result.restaurants]);
      setNextRequest(result.nextRequest);
      setHasMore(result.hasMore);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more restaurants.';
      setError(errorMessage);
    } finally {
      setLoadingMore(false);
    }
  };

  // Load data based on route and location
  useEffect(() => {
    if (isTestMode) {
      // Use dummy data when test param is present
      fetchRestaurants(0, 0, true); // lat/lng don't matter for test data
    } else if (userLocation) {
      // Use real user location only
      fetchRestaurants(userLocation.lat, userLocation.lng, true);
    }
  }, [isTestMode, userLocation]);

  // Helper function to get best price for a restaurant
  const getBestPrice = (restaurant: Restaurant) => {
    // Check if any delivery option is free
    const hasFreeOption = restaurant.deliveryOptions.some(option => option.isFree);

    if (hasFreeOption) {
      return 0; // Free delivery gets priority (lowest price)
    }

    // Get numeric prices for non-free options
    const numericPrices = restaurant.deliveryOptions
      .filter(option => !option.isFree)
      .map(option => typeof option.price === 'string' ? parseFloat(option.price) : option.price)
      .filter(price => !isNaN(price));

    return numericPrices.length > 0 ? Math.min(...numericPrices) : Infinity;
  };

  // Helper function to convert distance to number for sorting
  const getDistanceNumber = (distance: string) => {
    return parseFloat(distance.replace(/[^\d.]/g, ''));
  };

  // Filter and sort restaurants
  const filteredAndSortedRestaurants = useMemo(() => {
    // First filter by search query
    let filtered = restaurants;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = restaurants.filter(restaurant => {
        // Normalize search function for better Arabic and English search
        const normalizeText = (text: string) =>
          text.toLowerCase()
            .replace(/[\u064B-\u065F]/g, '') // Remove Arabic diacritics
            .replace(/[^\w\s\u0600-\u06FF]/g, '') // Keep only alphanumeric, spaces, and Arabic characters
            .trim();

        // Search in restaurant name (English)
        const nameMatch = normalizeText(restaurant.name).includes(normalizeText(query));

        // Search in restaurant name (Arabic)
        const nameArMatch = restaurant.nameAr ?
          normalizeText(restaurant.nameAr).includes(normalizeText(query)) : false;

        // Search in tags
        const tagMatch = restaurant.tags.some(tag =>
          normalizeText(tag).includes(normalizeText(query))
        );

        // Search in delivery apps
        const deliveryMatch = restaurant.deliveryOptions.some(option =>
          normalizeText(option.name).includes(normalizeText(query))
        );

        // Simple Arabic food type matching
        const arabicFoodMatch = () => {
          const foodKeywords = {
            'برجر': 'burger',
            'برغر': 'burger',
            'دجاج': 'chicken',
            'فراخ': 'chicken',
            'عربي': 'arabic',
            'عربية': 'arabic',
            'صحي': 'healthy',
            'صحية': 'healthy',
            'شاورما': 'shawarma',
            'شاورمة': 'shawarma',
            'بيتزا': 'pizza',
            'بيزا': 'pizza',
            'قهوة': 'coffee',
            'كوفي': 'coffee'
          };

          return Object.entries(foodKeywords).some(([arabicWord, englishWord]) => {
            if (normalizeText(query).includes(normalizeText(arabicWord))) {
              return restaurant.tags.some(tag =>
                normalizeText(tag).includes(normalizeText(englishWord))
              );
            }
            return false;
          });
        };

        return nameMatch || nameArMatch || tagMatch || deliveryMatch || arabicFoodMatch();
      });
    }

    // Then sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price': {
          const priceA = getBestPrice(a);
          const priceB = getBestPrice(b);
          return priceA - priceB;
        }
        case 'distance': {
          const distanceA = getDistanceNumber(a.distance);
          const distanceB = getDistanceNumber(b.distance);
          return distanceA - distanceB;
        }
        case 'rating': {
          return b.rating - a.rating; // Higher rating first
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, restaurants]);

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Category Selection */}
      <div className="w-full bg-white py-8 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#1E1E1E] text-3xl font-medium mb-8">Select by Category</h2>
          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-9 gap-6 justify-items-center">
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Fast-Food.png" alt="Fast Food" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Fast Food</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Arabic.png" alt="Arabic" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Arabic</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Sandwich.png" alt="Sandwich" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Sandwich</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Grill.png" alt="Grill" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Grill</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Seafood.png" alt="Seafood" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Seafood</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Asian.png" alt="Asian" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Asian</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Healthy.png" alt="Healthy" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Healthy</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Mexican.png" alt="Mexican" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Mexican</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="/categories_img/Pasta.png" alt="Pasta" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#03282C] text-sm font-semibold text-center">Pasta</span>
            </div>
          </div>
          {/* Mobile: Scrollable 2 Rows */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="grid grid-flow-col auto-cols-max gap-x-6 gap-y-4" style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Fast-Food.png" alt="Fast Food" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Fast Food</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Seafood.png" alt="Seafood" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Seafood</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Arabic.png" alt="Arabic" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Arabic</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Asian.png" alt="Asian" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Asian</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Sandwich.png" alt="Sandwich" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Sandwich</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Healthy.png" alt="Healthy" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Healthy</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Grill.png" alt="Grill" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Grill</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Mexican.png" alt="Mexican" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Mexican</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-20">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/categories_img/Pasta.png" alt="Pasta" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#03282C] text-xs font-semibold text-center whitespace-nowrap">Pasta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E1E1E] mb-4"></div>
            <p className="text-[#44505C] text-lg">Loading restaurants...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => userLocation && fetchRestaurants(userLocation.lat, userLocation.lng)}
              className="bg-[#1E1E1E] text-white px-6 py-2 rounded-lg hover:bg-[#333] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Restaurant Cards Grid */}
        {!loading && !error && filteredAndSortedRestaurants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 xl:gap-6 justify-items-center pb-16">
            {filteredAndSortedRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={index}
                {...restaurant}
                onRestaurantClick={(restaurant) => {
                  setSelectedRestaurant(restaurant);
                  setShowBestOfferModal(true);
                }}
              />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && filteredAndSortedRestaurants.length === 0 && restaurants.length > 0 && (
          <div className="text-center py-16">
            <p className="text-[#44505C] text-lg mb-4">{t('no_restaurants')}</p>
            <p className="text-[#94A3B8] text-sm">{t('try_different_search')}</p>
          </div>
        )}


        {/* Load More Button */}
        {!loading && !error && !isTestMode && hasMore && restaurants.length > 0 && (
          <div className="text-center py-8">
            <button
              onClick={loadMoreRestaurants}
              disabled={loadingMore}
              className="bg-[#1E1E1E] text-white px-8 py-3 rounded-lg hover:bg-[#333] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <div className="flex items-center gap-2">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading More...
                </div>
              ) : (
                'Load More Restaurants'
              )}
            </button>
          </div>
        )}

        {/* No Location Permission State */}
        {!loading && !error && !isTestMode && !userLocation && (
          <div className="text-center py-16">
            <p className="text-[#44505C] text-lg mb-4">Location access required</p>
            <p className="text-[#94A3B8] text-sm mb-4">Please allow location access to see restaurants near you</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#1E1E1E] text-white px-6 py-2 rounded-lg hover:bg-[#333] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>

      {/* Best Offer Modal */}
      {selectedRestaurant && (
        <BestOfferModal
          isOpen={showBestOfferModal}
          onClose={() => {
            setShowBestOfferModal(false);
            setSelectedRestaurant(null);
          }}
          restaurant={{
            name: selectedRestaurant.name,
            rating: selectedRestaurant.rating,
            distance: selectedRestaurant.distance,
            cuisine: selectedRestaurant.tags,
            deliveryTime: "20-35 mins", // This could be dynamic based on the best offer
            deliveryPartner: {
              name: selectedRestaurant.deliveryOptions.find(option =>
                option.isFree ||
                (selectedRestaurant.deliveryOptions.filter(opt => !opt.isFree).length > 0 &&
                 parseFloat(option.price.toString()) === Math.min(...selectedRestaurant.deliveryOptions
                   .filter(opt => !opt.isFree)
                   .map(opt => parseFloat(opt.price.toString()))
                   .filter(p => !isNaN(p))))
              )?.name || "Jahez",
              logo: selectedRestaurant.deliveryOptions.find(option =>
                option.isFree ||
                (selectedRestaurant.deliveryOptions.filter(opt => !opt.isFree).length > 0 &&
                 parseFloat(option.price.toString()) === Math.min(...selectedRestaurant.deliveryOptions
                   .filter(opt => !opt.isFree)
                   .map(opt => parseFloat(opt.price.toString()))
                   .filter(p => !isNaN(p))))
              )?.image || "/delivery_logos/jahez.png",
              rating: 4.7
            },
            offers: {
              discountPrice: selectedRestaurant.deliveryOptions.some(option => option.isFree)
                ? 0
                : Math.min(...selectedRestaurant.deliveryOptions
                    .filter(opt => !opt.isFree)
                    .map(opt => parseFloat(opt.price.toString()))
                    .filter(p => !isNaN(p))),
              standardPrice: 20,
              conditions: ["New-Users", "Plus memberships", "Orders above SAR 50"]
            },
            image: selectedRestaurant.image
          }}
        />
      )}

      {/* Loading Modal */}
      <LoadingModal isOpen={loading} />
    </div>
  );
}