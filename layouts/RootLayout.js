import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import styles from '../styles/root.module.css';
import Modal from '../components/Modal/Modal';
import BuyMeCrypto from '../components/BuyMeCrypto/BuyMeCrypto'
import useModalRoute from '../hooks/useModalRoute'


export default function Root({ children }) {

  const [isOpen, handleClose] = useModalRoute('buymecrypto');

  return (
    <div className={styles.root}>
      <Head>
        <link rel="icon" href="/images/logo.svg" />
        <meta
          name="description"
          content="Parichay's personal website using Next.js"
        />
        <title>Parichay</title>
      </Head>
      <Nav />
      {children}
      <Footer />
      <Modal open={isOpen} handleClose={handleClose}>
        <BuyMeCrypto />
      </Modal>
    </div>
  );
}
