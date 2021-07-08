import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pathContainsModalPathQuery } from '../lib/utils';

export default function useNavSelection() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/') {
      setSelectedMenu('home');
    } else if (
      router.asPath === '/blog' ||
      (router.asPath.startsWith('/posts') &&
        !pathContainsModalPathQuery(router.asPath, 'buymecrypto'))
    ) {
      setSelectedMenu('blog');
    } else if (router.asPath === '/about') {
      setSelectedMenu('about');
    } else if (
      router.asPath === '/buymecrypto' ||
      pathContainsModalPathQuery(router.asPath, 'buymecrypto')
    ) {
      setSelectedMenu('buymecrypto');
    }
  }, [router]);

  return [selectedMenu];
}
