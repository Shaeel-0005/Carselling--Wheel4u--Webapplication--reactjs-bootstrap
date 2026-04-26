const createMockImage = (title, subtitle, startColor, endColor, accentColor) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${startColor}" />
          <stop offset="100%" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#bg)" rx="28" />
      <circle cx="500" cy="88" r="58" fill="${accentColor}" opacity="0.18" />
      <circle cx="126" cy="328" r="24" fill="#111827" />
      <circle cx="490" cy="328" r="24" fill="#111827" />
      <path d="M108 292h410c11 0 20-9 20-20v-18c0-10-7-18-17-20l-74-12-51-70c-8-10-20-16-33-16H234c-19 0-37 9-48 24l-47 62-42 9c-13 3-22 14-22 27v14c0 11 9 20 20 20h13z" fill="rgba(255,255,255,0.92)" />
      <path d="M195 175h144c19 0 36 10 46 27l19 30H158l21-29c4-6 10-12 16-16z" fill="${accentColor}" opacity="0.9" />
      <path d="M150 246h285" stroke="#d1d5db" stroke-width="8" stroke-linecap="round" />
      <text x="52" y="72" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${title}</text>
      <text x="52" y="112" fill="rgba(255,255,255,0.86)" font-family="Arial, Helvetica, sans-serif" font-size="18">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const mockProducts = [
  {
    id: 'mock-civic-rs',
    name: 'Honda Civic RS Turbo',
    description: '2022 model, sunroof, leather interior, first owner, immaculate condition.',
    price: 8795000,
    year: 2022,
    brand: 'Honda',
    created_at: '2026-04-21T10:00:00Z',
    image_path: createMockImage('Honda Civic RS', 'Turbo sedan | Automatic', '#0f172a', '#1d4ed8', '#f97316')
  },
  {
    id: 'mock-corolla-grande',
    name: 'Toyota Corolla Grande',
    description: 'Reliable daily driver with low mileage, navigation, and climate control.',
    price: 7425000,
    year: 2021,
    brand: 'Toyota',
    created_at: '2026-04-20T09:30:00Z',
    image_path: createMockImage('Corolla Grande', 'Comfort focused family sedan', '#1f2937', '#059669', '#fde047')
  },
  {
    id: 'mock-sportage',
    name: 'Kia Sportage AWD',
    description: 'Spacious SUV with panoramic roof, parking sensors, and premium audio.',
    price: 10950000,
    year: 2023,
    brand: 'Kia',
    created_at: '2026-04-19T14:15:00Z',
    image_path: createMockImage('Kia Sportage', 'AWD SUV | Panoramic roof', '#3f1d2e', '#be123c', '#fb7185')
  },
  {
    id: 'mock-yaris-ativ',
    name: 'Toyota Yaris ATIV X',
    description: 'Compact city sedan with fuel-efficient drive and clean interior.',
    price: 4680000,
    year: 2020,
    brand: 'Toyota',
    created_at: '2026-04-18T16:45:00Z',
    image_path: createMockImage('Yaris ATIV X', 'Smooth city runner', '#111827', '#7c3aed', '#22d3ee')
  },
  {
    id: 'mock-elantra',
    name: 'Hyundai Elantra GLS',
    description: 'Modern styling, reverse camera, alloy wheels, and excellent road grip.',
    price: 6350000,
    year: 2021,
    brand: 'Hyundai',
    created_at: '2026-04-17T11:20:00Z',
    image_path: createMockImage('Elantra GLS', 'Elegant midsize sedan', '#172554', '#2563eb', '#93c5fd')
  },
  {
    id: 'mock-fortuner',
    name: 'Toyota Fortuner Sigma 4',
    description: 'Powerful diesel SUV built for long trips, rough roads, and family comfort.',
    price: 18900000,
    year: 2023,
    brand: 'Toyota',
    created_at: '2026-04-16T08:50:00Z',
    image_path: createMockImage('Fortuner Sigma 4', 'Adventure ready SUV', '#292524', '#ea580c', '#fdba74')
  },
  {
    id: 'mock-alsvin',
    name: 'Changan Alsvin Lumiere',
    description: 'Budget-friendly automatic sedan with stylish dashboard and smart infotainment.',
    price: 4390000,
    year: 2022,
    brand: 'Changan',
    created_at: '2026-04-15T13:05:00Z',
    image_path: createMockImage('Alsvin Lumiere', 'Smart value automatic', '#083344', '#0891b2', '#67e8f9')
  },
  {
    id: 'mock-mg-hs',
    name: 'MG HS Essence',
    description: 'Feature-packed crossover with bold design, adaptive cruise, and comfort seats.',
    price: 9980000,
    year: 2022,
    brand: 'MG',
    created_at: '2026-04-14T18:30:00Z',
    image_path: createMockImage('MG HS Essence', 'Feature rich crossover', '#3b0764', '#9333ea', '#f0abfc')
  }
];

export const sortProductsByDate = (products) =>
  [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
