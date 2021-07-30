import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import styles from '../styles/root.module.css';
import Modal from '../components/Modal/Modal';
import BuyMeCrypto from '../components/BuyMeCrypto/BuyMeCrypto'
import useModalRoute from '../hooks/useModalRoute'
import NewsLetter from '../components/NewsLetter/NewsLetter'


export default function Root({ children }) {

  const [isOpenBuyMeCrypto, handleCloseBuyMeCrypto] = useModalRoute('buymecrypto');

  const [isOpenNewsLetter, handleCloseNewsLetter] = useModalRoute('newsletter');

  return (
    <div className={styles.root}>
      <Head>
        <title>Parichay</title>
      </Head>
      <Nav />
      {children}
      <Footer />
      <Modal open={isOpenBuyMeCrypto} handleClose={handleCloseBuyMeCrypto}>
        <BuyMeCrypto />
      </Modal>
      <Modal open={isOpenNewsLetter} handleClose={handleCloseNewsLetter}>
        <NewsLetter />
      </Modal>
    </div>
  );
}
