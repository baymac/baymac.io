'use client';

import { useState } from 'react';

export default function useModalRoute(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return [isOpen, handleOpen, handleClose];
}
