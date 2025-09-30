import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="w-full h-[90px] bg-white flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32">
      {/* Logo */}
      <div className="text-[#043434] text-xl sm:text-2xl font-bold font-['Futura']">
        Farq
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-7">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          <span className="text-[#282A33] text-sm sm:text-base font-medium font-['Plus_Jakarta_Sans']">
            {language === 'en' ? 'عربي' : 'English'}
          </span>
        </button>
      </div>
    </div>
  );
}