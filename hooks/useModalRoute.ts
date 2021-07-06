import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function useModalRoute(
  modalRoutePath: string
): [string, boolean, () => void] {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Using this ref to redirect to the prevRoute in case of buymecrypto
  const prevRoute = useRef(
    router.asPath === `${modalRoutePath}` || router.asPath.includes('?')
      ? '/'
      : router.asPath
  );

  const handleClose = () => {
    router.push(prevRoute.current, prevRoute.current, { scroll: false });
  };

  useEffect(() => {
    // In case of ?buymecrypto=1, we are preventing prevRoute change and set it to / as the default value so that modal can be closed.
    // if (router.asPath !== `${modalRoutePath}` && !router.asPath.includes('?')) {
    //   prevRoute.current = router.asPath;
    // }
    if (!!router.query.buymecrypto) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [modalRoutePath, router]);

  return [prevRoute.current, isOpen, handleClose];
}
