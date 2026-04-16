import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CollegeAdm – Direct Admission In India',
    short_name: 'CollegeAdm',
    description: 'Find direct admission guidance for top colleges in Bangalore & Karnataka.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ea580c',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
