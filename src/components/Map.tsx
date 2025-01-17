import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/components/ui/use-toast';

interface CovidData {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('pk.eyJ1IjoiZXZhbmthaGVueWEiLCJhIjoiY2tvd25nM29jMDgwdTJ1cWc3d2JuMGJreiJ9.kB8b3SBrt-BE_6ux4p7mGQ');
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [20, 0], // Center on Africa
        zoom: 3,
        projection: 'mercator'
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for African countries (sample data)
      const sampleData: CovidData[] = [
        { country: 'South Africa', cases: 4000000, deaths: 100000, recovered: 3800000, active: 100000 },
        { country: 'Egypt', cases: 3000000, deaths: 90000, recovered: 2800000, active: 110000 },
        { country: 'Morocco', cases: 2500000, deaths: 80000, recovered: 2300000, active: 120000 },
      ];

      const coordinates = {
        'South Africa': [25.0339, -29.0000],
        'Egypt': [30.8025, 26.8206],
        'Morocco': [-7.0926, 31.7917],
      };

      sampleData.forEach((country) => {
        const coords = coordinates[country.country as keyof typeof coordinates];
        if (!coords || !map.current) return;

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = '#ea384c';
        el.style.width = '15px';
        el.style.height = '15px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';

        new mapboxgl.Marker(el)
          .setLngLat(coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="text-sm">
                <h3 class="font-bold mb-2">${country.country}</h3>
                <p class="mb-1">Total Cases: ${country.cases.toLocaleString()}</p>
                <p class="mb-1">Active Cases: ${country.active.toLocaleString()}</p>
                <p class="mb-1">Recovered: ${country.recovered.toLocaleString()}</p>
                <p>Deaths: ${country.deaths.toLocaleString()}</p>
              </div>
            `)
          )
          .addTo(map.current);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Error",
        description: "Failed to initialize the map. Please check your API key.",
        variant: "destructive",
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, toast]);

  return (
    <div className="relative w-full h-screen">
      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Enter Mapbox Token</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter your Mapbox public token"
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-sm text-gray-600">
              Get your token from{' '}
              <a
                href="https://account.mapbox.com/access-tokens/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Mapbox
              </a>
            </p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;