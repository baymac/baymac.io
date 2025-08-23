import { Metadata } from 'next';
import BuyMeCrypto from '../components/BuyMeCrypto/BuyMeCrypto';
import Footer from '../components/Footer/Footer';
import Modal from '../components/Modal/Modal';
import Nav from '../components/Nav/Nav';
import useModalRoute from '../hooks/useModalRoute';
import styles from '../styles/root.module.css';

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
