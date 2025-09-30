import { createRootRoute, Outlet } from '@tanstack/react-router'
import { LocationProvider } from '../contexts/LocationContext'
import { LanguageProvider } from '../contexts/LanguageContext'

export const Route = createRootRoute({
  component: () => (
    <LanguageProvider>
      <LocationProvider>
        <Outlet />
      </LocationProvider>
    </LanguageProvider>
  ),
})