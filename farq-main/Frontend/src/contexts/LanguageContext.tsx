import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'welcome': 'Welcome to Farq',
    'location_description': 'We need your location to show nearby restaurants and delivery prices',
    'enable_location': 'Enable Location',
    'privacy_text': 'We will only use your location to display nearby restaurants and will not share it with any third party',
    'best_offers': 'Best offers',
    'search_placeholder': 'Search for a restaurant or type of food',
    'search_mobile_placeholder': 'Search for Restaurants',
    'sort_by_distance': 'Sort by Distance',
    'sort_by_price': 'Sort by Price',
    'sort_by_rating': 'Sort by Rating',
    'search_results': 'Search Results',
    'no_restaurants': 'No restaurants found',
    'try_different_search': 'Try searching for a different restaurant, food type, or delivery app',
    'search': 'Search',
    'delivery_prices': 'Delivery Prices',
    'free': 'Free',
    'delivered_by': 'Delivered by',
    'delivery_time': 'Delivery Time',
    'discount_price': 'Discount Price',
    'standard_price': 'Standard Price',
    'standard_delivery_description': 'Standard delivery price for all users',
    'order_on': 'Order on',
    'loading': 'Loading',
    'save_more_by_comparing': 'Save More by Comparing',
    'save_more_description': 'On average, users in Saudi Arabia save up to 20–25% by checking the same meal across different delivery apps',
    'previous': 'Previous',
    'next': 'Next',
    'searching_restaurants': 'Searching restaurants',
    'analyzing_prices': 'Analyzing prices',
    'comparing_offers': 'Comparing offers',
    'finding_best_deals': 'Finding best deals',
    'calculating_savings': 'Calculating savings',
    'almost_ready': 'Almost ready'
  },
  ar: {
    'welcome': 'مرحباً بك في فرق',
    'location_description': 'نحتاج موقعك لإظهار المطاعم القريبة وأسعار التوصيل',
    'enable_location': 'تفعيل الموقع',
    'privacy_text': 'سنستخدم موقعك فقط لإظهار المطاعم القريبة ولن نشاركه مع أي طرف ثالث',
    'best_offers': 'أفضل العروض',
    'search_placeholder': 'ابحث عن مطعم أو نوع طعام',
    'search_mobile_placeholder': 'ابحث عن المطاعم',
    'sort_by_distance': 'ترتيب حسب المسافة',
    'sort_by_price': 'ترتيب حسب السعر',
    'sort_by_rating': 'ترتيب حسب التقييم',
    'search_results': 'نتائج البحث',
    'no_restaurants': 'لم يتم العثور على مطاعم',
    'try_different_search': 'جرب البحث عن مطعم أو نوع طعام أو تطبيق توصيل مختلف',
    'search': 'بحث',
    'delivery_prices': 'أسعار التوصيل',
    'free': 'مجاني',
    'delivered_by': 'توصيل بواسطة',
    'delivery_time': 'وقت التوصيل',
    'discount_price': 'السعر بالخصم',
    'standard_price': 'السعر العادي',
    'standard_delivery_description': 'سعر التوصيل العادي لجميع المستخدمين',
    'order_on': 'اطلب من',
    'loading': 'جاري التحميل',
    'save_more_by_comparing': 'وفر أكثر بالمقارنة',
    'save_more_description': 'في المتوسط، يوفر المستخدمون في السعودية ما يصل إلى 20-25% من خلال فحص نفس الوجبة عبر تطبيقات التوصيل المختلفة',
    'previous': 'السابق',
    'next': 'التالي',
    'searching_restaurants': 'البحث عن المطاعم',
    'analyzing_prices': 'تحليل الأسعار',
    'comparing_offers': 'مقارنة العروض',
    'finding_best_deals': 'البحث عن أفضل الصفقات',
    'calculating_savings': 'حساب التوفيرات',
    'almost_ready': 'تقريباً جاهز'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const value: LanguageContextType = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}