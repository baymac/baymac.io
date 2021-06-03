import Head from "next/head";
import Footer from "./Footer";
import Main from "./Main";
import Nav from "./Nav";

export default function Root() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Parichay's personal website using Next.js"
        />
      </Head>
      <Nav />
      <Main />
      <Footer />
    </>
  );
}
