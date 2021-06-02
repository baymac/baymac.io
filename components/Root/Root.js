import Head from "next/head";
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
    </>
  );
}
