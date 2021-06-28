import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import styles from "../styles/root.module.css";

export default function Root({ children }) {

  return (
    <div className={styles.root}>
      <Head>
        <link rel="icon" href="logo.svg" />
        <meta
          name="description"
          content="Parichay's personal website using Next.js"
        />
        <title>Parichay</title>
      </Head>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
