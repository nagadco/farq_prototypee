import DeliveryPage from './pages/DeliveryPage'
import { LocationProvider, useLocation } from './contexts/LocationContext'
import { LanguageProvider } from './contexts/LanguageContext'
import LocationPermissionModal from './components/LocationPermissionModal'

function AppContent() {
  const { showLocationModal, allowLocation, denyLocation, closeModal } = useLocation()

  return (
    <>
      <DeliveryPage />
      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={closeModal}
        onAllow={allowLocation}
        onDeny={denyLocation}
      />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <AppContent />
      </LocationProvider>
    </LanguageProvider>
  )
}

export default App