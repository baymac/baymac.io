'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './hero.module.css';

export interface IHeroPolaroidProps {
  srcLight: string;
  srcDark: string;
  alt: string;
  /** Polaroid window size — drives <Image> width/height. */
  size?: number;
  /** Initial letter shown if the image fails to load. */
  initial?: string;
}

/**
 * Client leaf that renders the polaroid image and swaps to a styled initial
 * if `next/image` reports onError. Renders both light and dark variants;
 * CSS [data-theme] selectors in hero.module.css show the right one — keeps
 * the swap SSR-safe (no hydration flicker via useTheme).
 */
export default function HeroPolaroid({
  srcLight,
  srcDark,
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
        <>
          <Image
            src={srcLight}
            alt={alt}
            width={size}
            height={size + 40}
            priority
            placeholder="empty"
            className={`${styles.polaroidImage} ${styles.polaroidImageLight}`}
            onError={() => setErrored(true)}
          />
          <Image
            src={srcDark}
            alt=""
            aria-hidden="true"
            width={size}
            height={size + 40}
            placeholder="empty"
            className={`${styles.polaroidImage} ${styles.polaroidImageDark}`}
            onError={() => setErrored(true)}
          />
        </>
      )}
    </div>
  );
}
