import { MapPin, Clock, Star } from 'lucide-react';
import type { Restaurant } from '../types/restaurant';

interface RestaurantCardProps extends Restaurant {
  onRestaurantClick?: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({
  name,
  rating,
  distance,
  tags,
  image,
  deliveryOptions,
  isClosed = false,
  onRestaurantClick
}: RestaurantCardProps) {
  // Find the best (lowest) price among delivery options
  const getBestPrice = () => {
    const numericPrices = deliveryOptions
      .filter(option => !option.isFree)
      .map(option => typeof option.price === 'string' ? parseFloat(option.price) : option.price)
      .filter(price => !isNaN(price));

    return numericPrices.length > 0 ? Math.min(...numericPrices) : null;
  };

  const bestPrice = getBestPrice();
  const hasFreeOption = deliveryOptions.some(option => option.isFree);

  const isBestPrice = (option: typeof deliveryOptions[0]) => {
    if (hasFreeOption && option.isFree) return true;
    if (!hasFreeOption && bestPrice !== null) {
      const optionPrice = typeof option.price === 'string' ? parseFloat(option.price) : option.price;
      return optionPrice === bestPrice;
    }
    return false;
  };
  return (
    <div
      className={`w-full max-w-[333px] bg-white rounded-2xl border overflow-hidden relative cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${
        isClosed ? 'opacity-75 border-gray-300' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => {
        if (onRestaurantClick) {
          onRestaurantClick({
            name,
            rating,
            distance,
            tags,
            image,
            deliveryOptions,
            isClosed
          });
        }
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onRestaurantClick) {
            onRestaurantClick({
              name,
              rating,
              distance,
              tags,
              image,
              deliveryOptions,
              isClosed
            });
          }
        }
      }}
      aria-label={`View details for ${name}`}
    >
      {/* Closed Overlay */}
      {isClosed && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            CLOSED
          </div>
        </div>
      )}

      {/* Restaurant Header */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Restaurant Image */}
          <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-100">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/48x48';
              }}
            />
          </div>

          {/* Restaurant Info */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[#282A33] text-base font-semibold leading-6">
                {name}
              </h3>
              {isClosed && (
                <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-0.5 rounded-full">
                  Closed
                </span>
              )}
            </div>

            {/* Rating and Distance */}
            <div className="flex items-center gap-1 h-5">
              <div className="flex items-center gap-0.5">
                <Star className="w-4 h-4 fill-[#009153] text-[#009153]" />
                <span className="text-[#009153] text-sm font-semibold">
                  {rating}
                </span>
              </div>
              <span className="text-[#44505C] text-sm">•</span>
              <div className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-[#44505C]" />
                <span className="text-[#44505C] text-sm">
                  {distance}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1 h-5 flex-wrap">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-1 py-0.5 bg-[#F7FAFC] border border-[#EBF1F7] rounded text-[#282A33] text-xs font-semibold whitespace-nowrap"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#EAE9E9]" />

      {/* Delivery Prices Header */}
      <div className="px-4 py-2 flex justify-end">
        <span className="text-[#655151] text-xs font-semibold">
          Delivery Prices
        </span>
      </div>

      {/* Delivery Options */}
      <div className="flex flex-col">
        {deliveryOptions.map((option, index) => (
          <div key={index} className={`px-4 py-2 ${isClosed ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-2">
              {/* Delivery Service Icon */}
              <div className="w-9 h-9 bg-white rounded-md border border-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={option.image || `/delivery_logos/${option.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                  alt={option.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/36x39';
                  }}
                />
              </div>

              {/* Service Info */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <h4 className="text-[#282A33] text-sm sm:text-base font-semibold truncate">
                  {option.name}
                </h4>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0F172A] flex-shrink-0" />
                  <span className="text-[#282D33] text-xs sm:text-sm">
                    {option.time}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {isClosed ? (
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 rounded-md">
                    <span className="text-gray-500 text-sm sm:text-base font-semibold">
                      Unavailable
                    </span>
                  </div>
                ) : option.isFree ? (
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 rounded-md">
                    <span className="text-[#008000] text-sm sm:text-base font-semibold">
                      Free
                    </span>
                  </div>
                ) : (
                  <div className={`flex items-center gap-1 ${isBestPrice(option) ? 'px-1.5 py-0.5 bg-green-50 rounded-md' : ''}`}>
                    <img
                      src="/Saudi_Riyal_Symbol.svg"
                      alt="SAR"
                      className="w-3.5 h-3.5"
                      style={{
                        filter: isBestPrice(option)
                          ? 'none'
                          : 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
                      }}
                    />
                    <span className={`text-xs sm:text-sm font-semibold ${isBestPrice(option) ? 'text-[#008000]' : 'text-black'}`}>
                      {option.price}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}