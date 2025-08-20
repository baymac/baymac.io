import { Metadata } from 'next';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import styles from '../styles/root.module.css';
import Modal from '../components/Modal/Modal';
import BuyMeCrypto from '../components/BuyMeCrypto/BuyMeCrypto';
import useModalRoute from '../hooks/useModalRoute';

export default function Root({ children, head = null, description = null }) {
  const [isOpenBuyMeCrypto, handleCloseBuyMeCrypto] =
    useModalRoute('buymecrypto');

  return (
    <div className={styles.root}>
      <Nav />
      {children}
      <Footer />
      <Modal open={isOpenBuyMeCrypto} handleClose={handleCloseBuyMeCrypto}>
        <BuyMeCrypto />
      </Modal>
    </div>
  );
}
