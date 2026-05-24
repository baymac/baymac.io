'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './hero.module.css';

export interface IHeroPolaroidProps {
  src: string;
  alt: string;
  /** Polaroid window size — drives <Image> width/height. */
  size?: number;
  /** Initial letter shown if the image fails to load. */
  initial?: string;
}

/**
 * Client leaf that renders the polaroid image and swaps to a styled initial
 * if `next/image` reports onError. Everything else in Hero stays server-side.
 */
export default function HeroPolaroid({
  src,
  alt,
  size = 280,
  initial = 'P',
}: IHeroPolaroidProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={styles.polaroidWindow}
      style={{ width: size, height: size + 40 }}
    >
      {errored ? (
        <div className={styles.polaroidFallback} aria-label={alt}>
          {initial}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size + 40}
          priority
          placeholder="empty"
          className={styles.polaroidImage}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
