'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useNavSelection() {
  const pathname = usePathname();

  // Initialize with the correct selection based on current pathname
  const getInitialSelection = () => {
    if (!pathname) return 'home';

    if (pathname === '/') {
      return 'home';
    } else if (pathname === '/blog' || pathname.startsWith('/posts')) {
      return 'blog';
    } else if (pathname === '/about') {
      return 'about';
    } else if (pathname === '/buymecrypto') {
      return 'buymecrypto';
    }

    return 'home';
  };

  const [selectedMenu, setSelectedMenu] = useState(getInitialSelection);

  useEffect(() => {
    if (!pathname) return;

    if (pathname === '/') {
      setSelectedMenu('home');
    } else if (
      pathname === '/blog' ||
      pathname.startsWith('/posts')
    ) {
      setSelectedMenu('blog');
    } else if (pathname === '/about') {
      setSelectedMenu('about');
    } else if (pathname === '/buymecrypto') {
      setSelectedMenu('buymecrypto');
    }
  }, [pathname]);

  return [selectedMenu];
}
