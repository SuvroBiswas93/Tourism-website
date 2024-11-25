// import React, { useEffect, useRef, useState } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';
// import type { Destination } from '../types';
// import { MapPin } from 'lucide-react';

// interface Props {
//   destination: Destination;
// }
interface MapProps {
  location: string
}

export default function Map({location}: MapProps) {
  return (<>
  <div className="mapswrapper">
  <iframe
    width="100%"
    height={450}
    loading="lazy"
    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}&zoom=16&maptype=roadmap`}
  />
  <a href="https://fnfmods.net">fnf</a>
  <style
    dangerouslySetInnerHTML={{
      __html:
        ".mapswrapper{background:#fff;position:relative}.mapswrapper iframe{border:0;position:relative;z-index:2}.mapswrapper a{color:rgba(0,0,0,0);position:absolute;left:0;top:0;z-index:0}"
    }}
  />
</div>
  </>);

  // const mapRef = useRef<HTMLDivElement>(null);
  // const [mapError, setMapError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Fallback coordinates if geocoding fails
  //   const defaultLocation = { lat: 0, lng: 0 };
    
  //   const initMap = async () => {
  //     try {
  //       // Check if API key is available
  //       const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  //       if (!apiKey) {
  //         throw new Error('Google Maps API key is not configured');
  //       }

  //       const loader = new Loader({
  //         apiKey,
  //         version: 'weekly',
  //         libraries: ['places'],
  //       });

  //       const google = await loader.load();
  //       if (!mapRef.current) return;

  //       // Create a static map as fallback
  //       const staticMap = new google.maps.Map(mapRef.current, {
  //         center: defaultLocation,
  //         zoom: 12,
  //         mapTypeControl: false,
  //         fullscreenControl: true,
  //         streetViewControl: false,
  //         zoomControl: true,
  //       });

  //       // Try to geocode the location
  //       const geocoder = new google.maps.Geocoder();
  //       geocoder.geocode({ address: destination.location }, (results, status) => {
  //         if (status === 'OK' && results && results[0]) {
  //           const location = results[0].geometry.location;
            
  //           // Update map with correct location
  //           staticMap.setCenter(location);
            
  //           // Add marker
  //           new google.maps.Marker({
  //             position: location,
  //             map: staticMap,
  //             title: destination.name,
  //             animation: google.maps.Animation.DROP,
  //           });
  //         } else {
  //           console.warn('Geocoding failed:', status);
  //           // Keep using the static map with default location
  //         }
  //       });

  //     } catch (error) {
  //       console.error('Map initialization error:', error);
  //       setMapError(error instanceof Error ? error.message : 'Failed to load the map');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   initMap();
  // }, [destination]);

  // if (mapError) {
  //   return (
  //     <div className="bg-white rounded-lg shadow-md overflow-hidden">
  //       <div className="p-6">
  //         <div className="flex items-center gap-3 mb-4">
  //           <MapPin className="h-6 w-6 text-gray-500" />
  //           <h3 className="text-2xl font-bold text-gray-900">Location</h3>
  //         </div>
  //         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
  //           <p className="text-gray-600">
  //             <span className="font-medium">Location:</span> {destination.location}
  //           </p>
  //           <p className="text-gray-500 text-sm mt-2">
  //             Interactive map temporarily unavailable. Please check back later.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="bg-white rounded-lg shadow-md overflow-hidden">
  //     <div className="p-4 border-b">
  //       <div className="flex items-center gap-3">
  //         <MapPin className="h-6 w-6 text-blue-500" />
  //         <h3 className="text-2xl font-bold text-gray-900">Location</h3>
  //       </div>
  //     </div>
  //     <div className="relative">
  //       {isLoading && (
  //         <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
  //         </div>
  //       )}
  //       <div ref={mapRef} className="h-[400px] w-full" />
  //     </div>
  //   </div>
  // );
}