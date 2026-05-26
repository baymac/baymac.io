'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';
import styles from './hero.module.css';

export interface IHeroPolaroidProps {
  /** Static import so next/image can auto-generate the blur placeholder. */
  src: StaticImageData;
  alt: string;
  /** Polaroid window size — drives <Image> width/height. */
  size?: number;
  /** Initial letter shown if the image fails to load. */
  initial?: string;
}

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
        <div className={styles.polaroidFallback} role="img" aria-label={alt}>
          {initial}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size + 40}
          priority
          placeholder="blur"
          className={styles.polaroidImage}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
