import type { Metadata } from 'next';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Timeline from '../components/Timeline/Timeline';

export const metadata: Metadata = {
  title: 'Parichay',
  description:
    "Parichay's personal website - Software Engineer and Tech Blogger",
  keywords: [
    'Parichay Barpanda',
    'software engineer',
    'web development',
    'blog',
    'tech',
  ],
};

// Section order locked in design Pass 1.B: lead with hero, then strongest proof
// (Projects), then supporting evidence (Timeline). Skills was cut in Pass 1.D
// (project descriptions carry the tech-stack signal). About is replaced by Hero
// (Pass 1.A scrapbook composition).
export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Timeline />
    </>
  );
}
