'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useNavSelection() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const pathname = usePathname();

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
