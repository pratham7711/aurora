export type Category = 'Frontend' | 'Backend' | 'AI' | 'Web3';

export interface DataPoint {
  id: number;
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  value: number;
  label: string;
  category: Category;
  commits: number;
  startups: number;
  developers: number;
  trend: number; // percentage change
}

export interface Arc {
  from: number; // DataPoint id
  to: number;
}

export const dataPoints: DataPoint[] = [
  { id: 0, city: 'San Francisco', country: 'USA', flag: '🇺🇸', lat: 37.77, lng: -122.42, value: 98, label: 'SF Tech Hub', category: 'AI', commits: 284000, startups: 3200, developers: 185000, trend: 12.4 },
  { id: 1, city: 'New York', country: 'USA', flag: '🇺🇸', lat: 40.71, lng: -74.01, value: 92, label: 'NYC Fintech', category: 'Backend', commits: 245000, startups: 2800, developers: 162000, trend: 8.7 },
  { id: 2, city: 'London', country: 'UK', flag: '🇬🇧', lat: 51.51, lng: -0.13, value: 89, label: 'London Dev Scene', category: 'Frontend', commits: 198000, startups: 2100, developers: 145000, trend: 6.3 },
  { id: 3, city: 'Berlin', country: 'Germany', flag: '🇩🇪', lat: 52.52, lng: 13.41, value: 82, label: 'Berlin Startups', category: 'Web3', commits: 167000, startups: 1800, developers: 112000, trend: 15.2 },
  { id: 4, city: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.68, lng: 139.69, value: 91, label: 'Tokyo Innovation', category: 'AI', commits: 210000, startups: 1500, developers: 158000, trend: 9.1 },
  { id: 5, city: 'Singapore', country: 'Singapore', flag: '🇸🇬', lat: 1.35, lng: 103.82, value: 85, label: 'SG Tech Hub', category: 'Web3', commits: 156000, startups: 1900, developers: 98000, trend: 18.6 },
  { id: 6, city: 'Bangalore', country: 'India', flag: '🇮🇳', lat: 12.97, lng: 77.59, value: 94, label: 'Silicon Valley of India', category: 'Backend', commits: 312000, startups: 3400, developers: 245000, trend: 22.1 },
  { id: 7, city: 'Shanghai', country: 'China', flag: '🇨🇳', lat: 31.23, lng: 121.47, value: 88, label: 'Shanghai AI Hub', category: 'AI', commits: 189000, startups: 2400, developers: 178000, trend: 14.8 },
  { id: 8, city: 'Seoul', country: 'South Korea', flag: '🇰🇷', lat: 37.57, lng: 126.98, value: 86, label: 'Seoul Gaming Dev', category: 'Frontend', commits: 175000, startups: 1600, developers: 134000, trend: 11.2 },
  { id: 9, city: 'Toronto', country: 'Canada', flag: '🇨🇦', lat: 43.65, lng: -79.38, value: 80, label: 'Toronto AI Research', category: 'AI', commits: 145000, startups: 1200, developers: 96000, trend: 13.5 },
  { id: 10, city: 'Tel Aviv', country: 'Israel', flag: '🇮🇱', lat: 32.09, lng: 34.78, value: 87, label: 'Startup Nation', category: 'Web3', commits: 168000, startups: 2600, developers: 89000, trend: 16.7 },
  { id: 11, city: 'Sydney', country: 'Australia', flag: '🇦🇺', lat: -33.87, lng: 151.21, value: 75, label: 'Sydney Tech', category: 'Frontend', commits: 112000, startups: 900, developers: 78000, trend: 7.8 },
  { id: 12, city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', lat: 52.37, lng: 4.90, value: 78, label: 'Dutch Dev Hub', category: 'Backend', commits: 134000, startups: 1100, developers: 82000, trend: 9.4 },
  { id: 13, city: 'Paris', country: 'France', flag: '🇫🇷', lat: 48.86, lng: 2.35, value: 81, label: 'Paris AI Scene', category: 'AI', commits: 148000, startups: 1400, developers: 105000, trend: 11.8 },
  { id: 14, city: 'Shenzhen', country: 'China', flag: '🇨🇳', lat: 22.54, lng: 114.06, value: 90, label: 'Hardware Valley', category: 'Backend', commits: 201000, startups: 2200, developers: 168000, trend: 17.3 },
  { id: 15, city: 'Dubai', country: 'UAE', flag: '🇦🇪', lat: 25.20, lng: 55.27, value: 76, label: 'Dubai Web3 Hub', category: 'Web3', commits: 98000, startups: 1300, developers: 56000, trend: 28.4 },
  { id: 16, city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', lat: -23.55, lng: -46.63, value: 79, label: 'LatAm Tech Capital', category: 'Frontend', commits: 142000, startups: 1500, developers: 118000, trend: 19.6 },
  { id: 17, city: 'Stockholm', country: 'Sweden', flag: '🇸🇪', lat: 59.33, lng: 18.07, value: 77, label: 'Nordic Unicorn Factory', category: 'Backend', commits: 118000, startups: 800, developers: 67000, trend: 8.2 },
  { id: 18, city: 'Austin', country: 'USA', flag: '🇺🇸', lat: 30.27, lng: -97.74, value: 83, label: 'Austin Tech Boom', category: 'AI', commits: 158000, startups: 1700, developers: 98000, trend: 24.1 },
  { id: 19, city: 'Mumbai', country: 'India', flag: '🇮🇳', lat: 19.08, lng: 72.88, value: 84, label: 'Mumbai Dev Scene', category: 'Frontend', commits: 178000, startups: 2000, developers: 195000, trend: 20.3 },
  { id: 20, city: 'Jakarta', country: 'Indonesia', flag: '🇮🇩', lat: -6.21, lng: 106.85, value: 72, label: 'SEA Rising Star', category: 'Frontend', commits: 96000, startups: 800, developers: 72000, trend: 25.7 },
  { id: 21, city: 'Moscow', country: 'Russia', flag: '🇷🇺', lat: 55.76, lng: 37.62, value: 74, label: 'Moscow Dev Hub', category: 'Backend', commits: 128000, startups: 600, developers: 94000, trend: 5.1 },
  { id: 22, city: 'Lisbon', country: 'Portugal', flag: '🇵🇹', lat: 38.72, lng: -9.14, value: 71, label: 'Web Summit City', category: 'Web3', commits: 82000, startups: 700, developers: 48000, trend: 32.6 },
  { id: 23, city: 'Nairobi', country: 'Kenya', flag: '🇰🇪', lat: -1.29, lng: 36.82, value: 68, label: 'Silicon Savanna', category: 'Frontend', commits: 67000, startups: 500, developers: 38000, trend: 35.2 },
  { id: 24, city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', lat: 6.52, lng: 3.38, value: 70, label: 'Lagos Tech Boom', category: 'Backend', commits: 78000, startups: 600, developers: 45000, trend: 38.1 },
  { id: 25, city: 'Zurich', country: 'Switzerland', flag: '🇨🇭', lat: 47.38, lng: 8.54, value: 79, label: 'Crypto Valley', category: 'Web3', commits: 112000, startups: 500, developers: 52000, trend: 10.4 },
  { id: 26, city: 'Seattle', country: 'USA', flag: '🇺🇸', lat: 47.61, lng: -122.33, value: 93, label: 'Cloud Capital', category: 'Backend', commits: 267000, startups: 1800, developers: 142000, trend: 7.9 },
  { id: 27, city: 'Beijing', country: 'China', flag: '🇨🇳', lat: 39.91, lng: 116.40, value: 92, label: 'Beijing AI Powerhouse', category: 'AI', commits: 256000, startups: 2800, developers: 210000, trend: 13.2 },
  { id: 28, city: 'Taipei', country: 'Taiwan', flag: '🇹🇼', lat: 25.03, lng: 121.57, value: 78, label: 'Chip Design Hub', category: 'Backend', commits: 124000, startups: 700, developers: 86000, trend: 9.8 },
  { id: 29, city: 'Helsinki', country: 'Finland', flag: '🇫🇮', lat: 60.17, lng: 24.94, value: 73, label: 'Gaming Hub', category: 'Frontend', commits: 96000, startups: 400, developers: 42000, trend: 6.8 },
  { id: 30, city: 'Cape Town', country: 'South Africa', flag: '🇿🇦', lat: -33.93, lng: 18.42, value: 65, label: 'African Tech Rise', category: 'Frontend', commits: 54000, startups: 350, developers: 32000, trend: 29.4 },
  { id: 31, city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', lat: 13.76, lng: 100.50, value: 69, label: 'Digital Nomad Hub', category: 'Web3', commits: 72000, startups: 450, developers: 48000, trend: 21.3 },
  { id: 32, city: 'Mexico City', country: 'Mexico', flag: '🇲🇽', lat: 19.43, lng: -99.13, value: 73, label: 'LatAm Rising', category: 'Frontend', commits: 98000, startups: 700, developers: 68000, trend: 26.8 },
  { id: 33, city: 'Warsaw', country: 'Poland', flag: '🇵🇱', lat: 52.23, lng: 21.01, value: 76, label: 'Eastern EU Dev Hub', category: 'Backend', commits: 118000, startups: 600, developers: 78000, trend: 14.2 },
  { id: 34, city: 'Dublin', country: 'Ireland', flag: '🇮🇪', lat: 53.35, lng: -6.26, value: 80, label: 'EU Tech Gateway', category: 'Backend', commits: 138000, startups: 900, developers: 72000, trend: 8.5 },
  { id: 35, city: 'Hyderabad', country: 'India', flag: '🇮🇳', lat: 17.39, lng: 78.49, value: 82, label: 'Cyberabad', category: 'AI', commits: 162000, startups: 1200, developers: 156000, trend: 19.8 },
  { id: 36, city: 'Ho Chi Minh City', country: 'Vietnam', flag: '🇻🇳', lat: 10.82, lng: 106.63, value: 70, label: 'Vietnam Dev Rise', category: 'Frontend', commits: 84000, startups: 500, developers: 58000, trend: 31.4 },
  { id: 37, city: 'Boston', country: 'USA', flag: '🇺🇸', lat: 42.36, lng: -71.06, value: 85, label: 'Biotech & AI Hub', category: 'AI', commits: 168000, startups: 1400, developers: 96000, trend: 10.6 },
  { id: 38, city: 'Denver', country: 'USA', flag: '🇺🇸', lat: 39.74, lng: -104.99, value: 74, label: 'Mountain Tech', category: 'Web3', commits: 102000, startups: 800, developers: 62000, trend: 16.3 },
  { id: 39, city: 'Bucharest', country: 'Romania', flag: '🇷🇴', lat: 44.43, lng: 26.10, value: 72, label: 'EU Outsourcing Hub', category: 'Backend', commits: 98000, startups: 400, developers: 68000, trend: 12.7 },
  { id: 40, city: 'Osaka', country: 'Japan', flag: '🇯🇵', lat: 34.69, lng: 135.50, value: 75, label: 'Osaka Robotics', category: 'AI', commits: 112000, startups: 600, developers: 82000, trend: 7.4 },
  { id: 41, city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', lat: -34.60, lng: -58.38, value: 71, label: 'LatAm Dev Talent', category: 'Frontend', commits: 88000, startups: 500, developers: 56000, trend: 22.5 },
  { id: 42, city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', lat: 3.14, lng: 101.69, value: 68, label: 'MY Digital Hub', category: 'Backend', commits: 72000, startups: 400, developers: 46000, trend: 18.9 },
];

export const arcs: Arc[] = [
  { from: 0, to: 4 },   // SF → Tokyo
  { from: 0, to: 2 },   // SF → London
  { from: 1, to: 2 },   // NYC → London
  { from: 2, to: 3 },   // London → Berlin
  { from: 4, to: 8 },   // Tokyo → Seoul
  { from: 6, to: 5 },   // Bangalore → Singapore
  { from: 0, to: 6 },   // SF → Bangalore
  { from: 7, to: 14 },  // Shanghai → Shenzhen
  { from: 2, to: 10 },  // London → Tel Aviv
  { from: 26, to: 9 },  // Seattle → Toronto
  { from: 27, to: 7 },  // Beijing → Shanghai
  { from: 1, to: 16 },  // NYC → São Paulo
  { from: 5, to: 20 },  // Singapore → Jakarta
  { from: 3, to: 12 },  // Berlin → Amsterdam
  { from: 13, to: 22 }, // Paris → Lisbon
  { from: 23, to: 24 }, // Nairobi → Lagos
  { from: 6, to: 35 },  // Bangalore → Hyderabad
  { from: 19, to: 6 },  // Mumbai → Bangalore
];

export const activityEvents = [
  { type: 'commit', city: 'San Francisco', message: 'Merged PR #4521 — LLM pipeline optimization', time: '2s ago' },
  { type: 'deploy', city: 'Berlin', message: 'Deployed v3.2.1 to production cluster', time: '5s ago' },
  { type: 'star', city: 'Tokyo', message: 'aurora-kit reached 10k GitHub stars', time: '12s ago' },
  { type: 'launch', city: 'Bangalore', message: 'New startup: CodeFlux raised $4.2M seed', time: '18s ago' },
  { type: 'commit', city: 'London', message: 'Pushed 847 commits across 12 repos', time: '23s ago' },
  { type: 'deploy', city: 'Singapore', message: 'Edge deployment: 14 new PoPs online', time: '31s ago' },
  { type: 'star', city: 'Seoul', message: 'react-globe-viz hit #1 on trending', time: '45s ago' },
  { type: 'launch', city: 'Tel Aviv', message: 'Web3 protocol launch: ChainPulse v1.0', time: '52s ago' },
  { type: 'commit', city: 'Shanghai', message: 'AI model checkpoint: 98.7% accuracy', time: '1m ago' },
  { type: 'deploy', city: 'São Paulo', message: 'Scaled to 50k concurrent users', time: '1m ago' },
  { type: 'star', city: 'Amsterdam', message: 'Open-source SDK: 5k forks in 24h', time: '2m ago' },
  { type: 'launch', city: 'Dubai', message: 'DeFi platform TVL crossed $100M', time: '2m ago' },
  { type: 'commit', city: 'Nairobi', message: 'Mobile-first payment API v2 shipped', time: '3m ago' },
  { type: 'deploy', city: 'Toronto', message: 'ML inference cluster expanded 3x', time: '3m ago' },
  { type: 'star', city: 'Lisbon', message: 'Web3 toolkit trending on Product Hunt', time: '4m ago' },
  { type: 'launch', city: 'Austin', message: 'New unicorn: DataMesh valued at $1.2B', time: '5m ago' },
];

export const categories: Category[] = ['Frontend', 'Backend', 'AI', 'Web3'];

export const categoryColors: Record<Category, string> = {
  Frontend: '#06B6D4',
  Backend: '#10B981',
  AI: '#A78BFA',
  Web3: '#F59E0B',
};
