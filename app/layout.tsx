import type { Metadata } from 'next';
import {
  Atkinson_Hyperlegible,
  Caveat,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import AppContextProvider from '../context/AppContextProvider';
import ThemeProvider from '../context/ThemeProvider';
import { themeScript } from '../lib/themeScript';
import styles from '../styles/root.module.css';
import '../styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
const hand = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hand',
});
const blog = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-blog',
});

export const metadata: Metadata = {
  title: 'Parichay',
  description: "Parichay's personal website",
  authors: [{ name: 'Parichay Barpanda', url: 'https://baymac.lol' }],
  keywords: ['web development', 'software engineering', 'blog', 'tech'],
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-icon.png', sizes: '180x180', type: 'image/png' },
      {
        url: '/favicons/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-precomposed.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        url: '/favicons/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        url: '/favicons/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/favicons/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: '/favicons/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicons/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/favicons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      { url: '/favicons/ms-icon-70x70.png', sizes: '70x70', type: 'image/png' },
      {
        url: '/favicons/ms-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/favicons/ms-icon-150x150.png',
        sizes: '150x150',
        type: 'image/png',
      },
      {
        url: '/favicons/ms-icon-310x310.png',
        sizes: '310x310',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Parichay',
    description: "Parichay's personal website",
    url: 'https://baymac.lol',
    siteName: 'Parichay',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parichay',
    description: "Parichay's personal website",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable} ${hand.variable} ${blog.variable}`}
    >
      <head>
        {/* Inline theme bootstrap — sets data-theme before paint to avoid a
            light-mode flash. Must be a plain inline <script> in <head> so the
            HTML parser executes it before any body paints; next/script
            beforeInteractive runs after the Next.js runtime and would cause
            a flash on light-themed pages. React 19 logs a dev-only warning
            about scripts inside components, but the script still executes
            correctly from the SSR'd HTML and the warning does not appear in
            production builds. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted inline bootstrap
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        {/* Global SVG defs for the hand-drawn `data-wobble` filter referenced
            from styles/global.css (`[data-wobble] { filter: url(#wobble) }`).
            Mounted once at the document root so every element with
            `data-wobble` — blog cards, project cards, timeline cards, hero
            polaroid — can reference `#wobble` without redefining it. The svg
            itself is invisible (zero size, absolute positioning). */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
          }}
        >
          <defs>
            <filter id="wobble">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.02"
                numOctaves="2"
                seed="3"
              />
              <feDisplacementMap in="SourceGraphic" scale="1.2" />
            </filter>
          </defs>
        </svg>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider defaultTheme="dark">
          <AppContextProvider>
            <div id="app-root">
              <div className={styles.root}>
                <Nav />
                <main id="main-content">{children}</main>
                <Footer />
              </div>
            </div>
            {modal}
            <div id="modal-root" />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
