import { Metadata } from 'next';
import About from '../components/About/About';
import UnderConstruction from '../components/UnderConstruction/UnderConstruction';

export const metadata: Metadata = {
  title: 'Parichay',
  description: "Parichay's personal website - Software Engineer and Tech Blogger",
  keywords: ['Parichay Barpanda', 'software engineer', 'web development', 'blog', 'tech'],
};

export default function HomePage() {
  return (
    <>
      <About />
      <UnderConstruction />
    </>
  );
}
