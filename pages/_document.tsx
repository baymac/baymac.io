import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts */}
          <link
            rel="preload"
            href="/fonts/Inter-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href="/fonts/Roboto-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href="/fonts/AtkinsonHyperlegible-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href="/fonts/AtkinsonHyperlegible-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />

          {/* Meta */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Parichay's personal website" />
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          {/* Icons */}
          <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
          <link
            href="/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          {/* favicon fallback for browsers that don't support svg */}
          <link rel="alternate icon" href="/favicons/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicons/apple-icon-icon.png" />
          <link rel="apple-touch-startup-image" href="/images/logo.svg" />
          {/* safari pinned icon */}
          <link rel="mask-icon" href="/images/logo.svg" color="#ff0000" />
          {/* Manifest */}
          <link rel="manifest" href="/favicons/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
