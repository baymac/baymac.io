import type { Metadata } from 'next';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import Skills from '../components/Skills/Skills';
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

export default function HomePage() {
  return (
    <>
      <About />
      <Skills />
      <Timeline />
      <Projects />
    </>
  );
}
