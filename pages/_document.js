import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <link
                    rel="preload"
                    href="/fonts/Inter-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Inter-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Roboto-Light.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <body>
                    <Main />
                    <NextScript />
                    <div id="modal-root"></div>
                </body>
            </Html>
        )
    }
}

export default MyDocument
