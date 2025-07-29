'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

/**
 * Obaluje children komponenty a zpřístupňuje Google Maps API.
 * Musí být použito v layoutu nebo před komponentami s mapou.
 */
export default function MapProvider({ children }) {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            {children}
        </APIProvider>
    );
}
