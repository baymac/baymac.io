import { Metadata } from 'next';
import AppContextProvider from '../context/AppContextProvider';
import { ThemeProvider } from 'next-themes';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import ClientModal from '../components/ClientModal';
import styles from '../styles/root.module.css';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Parichay',
  description: "Parichay's personal website",
  authors: [{ name: 'Parichay Barpanda', url: 'https://baymac.lol' }],
  keywords: ['web development', 'software engineering', 'blog', 'tech'],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <AppContextProvider>
            <div className={styles.root}>
              <Nav />
              {children}
              <Footer />
              <ClientModal />
            </div>
            <div id="modal-root"></div>
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


