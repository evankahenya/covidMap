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
        { country: 'Kenya', cases: 1200000, deaths: 32000, recovered: 1100000, active: 80000 },
        { country: 'Nigeria', cases: 2000000, deaths: 60000, recovered: 1800000, active: 140000 },
        { country: 'Ethiopia', cases: 1500000, deaths: 45000, recovered: 1400000, active: 55000 },
        { country: 'Algeria', cases: 1700000, deaths: 50000, recovered: 1600000, active: 50000 },
        { country: 'Ghana', cases: 900000, deaths: 25000, recovered: 850000, active: 25000 },
        { country: 'Uganda', cases: 800000, deaths: 20000, recovered: 750000, active: 30000 },
        { country: 'Tanzania', cases: 700000, deaths: 15000, recovered: 670000, active: 15000 },
        { country: 'Sudan', cases: 600000, deaths: 14000, recovered: 580000, active: 6000 },
        { country: 'Angola', cases: 500000, deaths: 12000, recovered: 480000, active: 8000 },
        { country: 'Zimbabwe', cases: 400000, deaths: 10000, recovered: 380000, active: 10000 },
        { country: 'Mozambique', cases: 350000, deaths: 8000, recovered: 330000, active: 12000 },
        { country: 'Zambia', cases: 300000, deaths: 7000, recovered: 280000, active: 13000 },
        { country: 'Botswana', cases: 250000, deaths: 6000, recovered: 240000, active: 4000 },
        { country: 'Namibia', cases: 200000, deaths: 5000, recovered: 190000, active: 5000 },
        { country: 'Cameroon', cases: 180000, deaths: 4000, recovered: 170000, active: 6000 },
        { country: 'Senegal', cases: 160000, deaths: 3000, recovered: 150000, active: 7000 },
        { country: 'Mali', cases: 140000, deaths: 2500, recovered: 130000, active: 7500 },
        { country: 'Burkina Faso', cases: 120000, deaths: 2000, recovered: 110000, active: 8000 },
        { country: 'Ivory Coast', cases: 100000, deaths: 1800, recovered: 95000, active: 3200 },
        { country: 'Madagascar', cases: 90000, deaths: 1500, recovered: 85000, active: 3500 },
        { country: 'Chad', cases: 80000, deaths: 1400, recovered: 75000, active: 3600 },
        { country: 'Rwanda', cases: 70000, deaths: 1200, recovered: 68000, active: 800 },
        { country: 'Benin', cases: 60000, deaths: 1100, recovered: 58000, active: 1900 },
        { country: 'Somalia', cases: 50000, deaths: 1000, recovered: 48000, active: 1000 },
        { country: 'Liberia', cases: 40000, deaths: 900, recovered: 38000, active: 1100 },
        { country: 'Sierra Leone', cases: 30000, deaths: 800, recovered: 29000, active: 200 },
        { country: 'Djibouti', cases: 20000, deaths: 500, recovered: 19000, active: 500 }
      ];

      const coordinates = {
        'South Africa': [25.0339, -29.0000],
        'Egypt': [30.8025, 26.8206],
        'Morocco': [-7.0926, 31.7917],
        'Kenya': [37.9062, -1.2864],
        'Nigeria': [8.6753, 9.0820],
        'Ethiopia': [39.6012, 9.1450],
        'Algeria': [1.6596, 28.0339],
        'Ghana': [-1.0232, 7.9465],
        'Uganda': [32.2903, 1.3733],
        'Tanzania': [34.8888, -6.3690],
        'Sudan': [30.2176, 12.8628],
        'Angola': [17.8739, -11.2027],
        'Zimbabwe': [29.1549, -19.0154],
        'Mozambique': [35.5296, -18.6657],
        'Zambia': [27.8493, -13.1339],
        'Botswana': [25.9201, -22.3285],
        'Namibia': [18.4904, -22.9576],
        'Cameroon': [12.3547, 7.3697],
        'Senegal': [-14.4524, 14.4974],
        'Mali': [-3.9962, 17.5707],
        'Burkina Faso': [-1.5616, 12.2383],
        'Ivory Coast': [-5.5471, 7.5399],
        'Madagascar': [46.8691, -18.7669],
        'Chad': [18.7322, 15.4542],
        'Rwanda': [29.8739, -1.9403],
        'Benin': [2.3158, 9.3077],
        'Somalia': [46.1996, 5.1521],
        'Liberia': [-9.4295, 6.4281],
        'Sierra Leone': [-11.7799, 8.4606],
        'Djibouti': [42.5903, 11.8251]
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