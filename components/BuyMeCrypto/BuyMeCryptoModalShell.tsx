'use client';

import { FocusTrap } from 'focus-trap-react';
import { useRouter } from 'next/navigation';
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import usePreventScroll from '../../hooks/usePreventScroll';
import type { Wallet } from '../../lib/wallets';
import { UilMultiply } from '../Icons/UilIcons';
import BuyMeCryptoCard from './BuyMeCryptoCard';
import styles from './buymecrypto-modal.module.css';

interface Props {
  wallets: Wallet[];
  /**
   * Where to send the user when they close the modal on a direct load
   * (no in-app history to pop). Defaults to "/" — used by the full-page
   * route. The intercepted modal passes `null` so close uses router.back().
   */
  closeFallback?: string | null;
}

export default function BuyMeCryptoModalShell({
  wallets,
  closeFallback = null,
}: Props) {
  const router = useRouter();
  const backdropRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  usePreventScroll(true);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    if (closeFallback) {
      router.push(closeFallback);
    } else {
      router.back();
    }
  }, [closeFallback, router]);

  // Document-level Escape so the key works even when focus is on body
  // (direct page load) before FocusTrap moves focus into the dialog.
  useEffect(() => {
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };
    document.addEventListener('keydown', onDocKey);
    return () => document.removeEventListener('keydown', onDocKey);
  }, [close]);

  const onBackdropMouseDown = (e: MouseEvent) => {
    if (backdropRef.current === e.target) close();
  };

  // Portal to document.body so the modal always lives outside #app-root —
  // important for the direct-load path where the modal is rendered inside
  // app/buymecrypto/page.tsx (i.e. inside #app-root). The scroll-lock hook
  // marks #app-root aria-hidden, which would otherwise hide the dialog
  // from the accessibility tree.
  const overlay = (
    <div className={styles.overlay}>
      {/* backdrop-filter is set inline because Turbopack's CSS pipeline
          strips it from the bundled stylesheet (lightningcss treats it as
          non-baseline). Inline styles bypass the optimizer. */}
      <div
        className={styles.backdrop}
        aria-hidden="true"
        style={{
          backdropFilter: 'blur(60px) saturate(160%)',
          WebkitBackdropFilter: 'blur(60px) saturate(160%)',
        }}
      />
      <FocusTrap>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismiss */}
        <div
          ref={backdropRef}
          className={styles.container}
          onMouseDown={onBackdropMouseDown}
          tabIndex={-1}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={styles.dialog}
            tabIndex={-1}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={styles.closeBtn}
            >
              <UilMultiply className={styles.closeIcon} />
            </button>
            <BuyMeCryptoCard wallets={wallets} />
          </div>
        </div>
      </FocusTrap>
    </div>
  );

  if (!mounted) return null;
  return createPortal(overlay, document.body);
}
