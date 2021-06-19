import "../styles/global.css";
import AppContextProvider from '../context/AppContextProvider'

export default function App({ Component, pageProps }) {
  return <AppContextProvider>
    <Component {...pageProps} />;
  </AppContextProvider>
}
