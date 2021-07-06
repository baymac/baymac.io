import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useModalRouteRedirect from './useModalRouteRedirect';

export default function useModalRoute(
  modalRoutePath: string
): [boolean, () => void] {
  const router = useRouter();

  const [redirectRoute] = useModalRouteRedirect(modalRoutePath);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    router.push(redirectRoute, redirectRoute, { scroll: false });
  };

  useEffect(() => {
    if (!!router.query[`${modalRoutePath}`]) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [modalRoutePath, router]);

  return [isOpen, handleClose];
}
