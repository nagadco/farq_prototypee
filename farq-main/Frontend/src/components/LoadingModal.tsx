import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import styles from './LoadingModal.module.css';

interface LoadingModalProps {
  isOpen: boolean;
}

export default function LoadingModal({ isOpen }: LoadingModalProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    // Total duration: 50 seconds
    // 6 steps, each step takes about 8.33 seconds
    const totalDuration = 50000; // 50 seconds
    const steps = 6;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / (totalDuration / 100)); // Increment every 100ms

        // Update current step based on progress
        const newStep = Math.min(Math.floor(newProgress / (100 / steps)), steps - 1);
        setCurrentStep(newStep);

        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        return newProgress;
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [isOpen]);

  const getLoadingText = () => {
    const messages = [
      t('searching_restaurants'),
      t('analyzing_prices'),
      t('comparing_offers'),
      t('finding_best_deals'),
      t('calculating_savings'),
      t('almost_ready')
    ];
    return messages[currentStep] || t('loading');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" style={{ top: 'calc(-1 * env(safe-area-inset-top))', bottom: 'calc(-1 * env(safe-area-inset-bottom))' }} />

      {/* Modal */}
      <div className="relative bg-white overflow-hidden mx-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[500px] p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center gap-8">
          {/* Progress bars */}
          <div className="w-full max-w-[363px] flex items-center gap-4">
            {Array.from({ length: 6 }, (_, index) => {
              const stepProgress = progress / (100 / 6); // Convert overall progress to step progress
              const isCompleted = stepProgress > index + 1;
              const isActive = Math.floor(stepProgress) === index;
              const currentStepProgress = isActive ? ((stepProgress - index) * 100) : 0;

              return (
                <div key={index} className="flex-1 h-1.5 relative">
                  <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full" />
                  <div
                    className="h-1.5 bg-[#043434] rounded-full absolute top-0 left-0 transition-all duration-300 ease-out"
                    style={{
                      width: isCompleted ? '100%' : isActive ? `${currentStepProgress}%` : '0%'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Loading illustration and text */}
          <div className="flex flex-col items-center gap-3.5">
            {/* Loading illustration */}
            <div className="w-[243px] h-[180px] relative flex items-center justify-center">
              <div className={styles.motorcycleContainer}>
                <div className={styles.wheelGlow} />
                <img
                  src="/Loading.svg"
                  alt="Loading"
                  className={`w-full h-full object-contain ${styles.motorcycleAnimation} ${styles.engineVibration}`}
                />
              </div>
            </div>

            <div className="max-w-[318px] text-center text-[#757575] text-base font-medium leading-[22.4px]">
              {getLoadingText()}...
            </div>
          </div>

          {/* Save More section */}
          <div className="flex flex-col items-start gap-5 w-full max-w-[363px]">
            <div className="flex flex-col items-center gap-5 w-full">
              <div className="flex flex-col items-center gap-1 w-full">
                <div className="text-center text-[#282A33] text-xl sm:text-2xl font-semibold leading-[28.8px]">
                  {t('save_more_by_comparing')}
                </div>
                <div className="max-w-[318px] text-center text-[#757575] text-sm font-normal leading-[19.6px]">
                  {t('save_more_description')}
                </div>
              </div>

              <div className="flex items-start gap-4 w-full max-w-[281px]">
                <button className="flex-1 px-[18px] py-3 bg-white rounded-lg border border-[#D9D9D9] flex justify-center items-center">
                  <div className="text-center text-[#040403] text-sm font-semibold leading-[17px]">
                    {t('previous')}
                  </div>
                </button>
                <button className="flex-1 px-[18px] py-3 bg-white rounded-lg border border-[#D9D9D9] flex justify-center items-center">
                  <div className="text-center text-[#040403] text-sm font-semibold leading-[17px]">
                    {t('next')}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}