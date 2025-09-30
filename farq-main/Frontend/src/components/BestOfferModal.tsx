import { X, Star, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BestOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: {
    name: string;
    rating: number;
    distance: string;
    cuisine: string[];
    deliveryTime: string;
    deliveryPartner: {
      name: string;
      logo: string;
      rating: number;
    };
    offers: {
      discountPrice: number;
      standardPrice: number;
      conditions: string[];
    };
    image: string;
  } | null;
}

export default function BestOfferModal({ isOpen, onClose, restaurant }: BestOfferModalProps) {
  const { t } = useLanguage();

  if (!isOpen || !restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-white overflow-hidden mx-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[440px] p-4 sm:p-6 lg:p-8"
        style={{
          boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.10)',
          borderRadius: 16,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Restaurant Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div
                className="w-12 h-12 bg-white overflow-hidden rounded-lg flex justify-center items-center"
                style={{ backgroundImage: `url(${restaurant.image})` }}
              >
                <img className="w-12 h-12 object-cover" src={restaurant.image} alt={restaurant.name} />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="text-[#282A33] text-base sm:text-lg font-semibold leading-6">
                    {restaurant.name}
                  </div>
                </div>

                <div className="h-5 flex items-center gap-1">
                  <div className="flex items-end gap-0.5">
                    <Star className="w-4 h-4 fill-[#009153] text-[#009153]" />
                    <div className="text-[#009153] text-sm sm:text-base font-semibold">
                      {restaurant.rating}
                    </div>
                  </div>
                  <div className="text-[#44505C] text-sm">•</div>
                  <div className="flex-1 flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-[#44505C]" />
                    <div className="flex-1 text-[#44505C] text-sm sm:text-base">
                      {restaurant.distance}
                    </div>
                  </div>
                </div>

                <div className="h-5 flex items-center gap-1">
                  {restaurant.cuisine.map((type, index) => (
                    <div
                      key={index}
                      className="min-h-5 px-1 py-0.5 bg-[#F7FAFC] overflow-hidden rounded border border-[#EBF1F7] flex items-center gap-1"
                    >
                      <div className="text-center text-[#282A33] text-xs font-semibold">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#B2B2B2] opacity-30" />

          {/* Content */}
          <div className="flex flex-col gap-6 sm:gap-9">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Delivered by section */}
              <div className="flex flex-col gap-3">
                <div className="text-[#757575] text-sm sm:text-base font-semibold leading-[19.6px]">
                  {t('delivered_by')}:
                </div>
                <div className="h-[53px] flex items-center gap-3">
                  <div
                    className="w-12 h-12 bg-white overflow-hidden rounded-lg border border-black/8 flex justify-center items-center"
                    style={{ backgroundImage: `url(${restaurant.deliveryPartner.logo})` }}
                  >
                    <img
                      className="flex-1 h-[52.47px] object-cover"
                      src={restaurant.deliveryPartner.logo}
                      alt={restaurant.deliveryPartner.name}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <div className="text-[#282D33] text-xl sm:text-2xl font-bold leading-6">
                        {restaurant.deliveryPartner.name}
                      </div>
                    </div>
                    <div className="h-5 flex items-center gap-1">
                      <div className="flex-1 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#0F172A]" />
                        <div className="flex-1 text-[#282D33] text-base sm:text-lg font-semibold leading-[22.4px]">
                          {t('delivery_time')}: {restaurant.deliveryTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing section */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Discount Price */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-[#282D33] text-xl sm:text-2xl font-semibold leading-6">
                      {t('discount_price')}
                    </div>
                    <div className="w-full max-w-[190px] text-[#1E1E1E] text-sm sm:text-base leading-[19.6px]">
                      {restaurant.offers.conditions.map((condition, index) => (
                        <span key={index}>
                          • {condition}
                          {index < restaurant.offers.conditions.length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    {restaurant.offers.discountPrice === 0 ? (
                      <div className="text-[#008000] text-2xl sm:text-3xl font-semibold leading-[28.8px]">
                        {t('free')}
                      </div>
                    ) : (
                      <>
                        <img
                          src="/Saudi_Riyal_Symbol.svg"
                          alt="SAR"
                          className="w-[22px] h-[22px]"
                          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(1583%) hue-rotate(87deg) brightness(94%) contrast(101%)' }}
                        />
                        <div className="text-[#008000] text-2xl sm:text-3xl font-semibold leading-[28.8px]">
                          {restaurant.offers.discountPrice}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Standard Price */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-[#282D33] text-xl sm:text-2xl font-semibold leading-6">
                      {t('standard_price')}
                    </div>
                    <div className="text-[#282D33] text-sm sm:text-base leading-[19.6px]">
                      {t('standard_delivery_description')}
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <img
                      src="/Saudi_Riyal_Symbol.svg"
                      alt="SAR"
                      className="w-5 h-5"
                      style={{ filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)' }}
                    />
                    <div className="text-[#282D33] text-xl sm:text-2xl font-semibold leading-6">
                      {restaurant.offers.standardPrice}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button
              className="self-stretch px-4 sm:px-6 py-3 sm:py-4 bg-[#043434] rounded-lg flex justify-center items-center gap-1.5 hover:bg-[#033232] transition-colors"
            >
              <div className="text-center text-[#F8FAFC] text-lg sm:text-xl font-semibold leading-[22px]">
                {t('order_on')} {restaurant.deliveryPartner.name}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}