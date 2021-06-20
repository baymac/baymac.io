import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import blogStyles from "../../styles/blog.module.css";
import styles from "./layout.module.css";
import useDarkMode̦ from '../../hooks/useDarkMode'
import { useState, useEffect } from "react";

const name = "Parichay";
export const siteTitle = "Parichay's blog";

export default function BlogLayout({ children }) {

  useDarkMode̦()

  const router = useRouter()

  const [backLinkLabel, setBackLinkLabel] = useState('/blog')
  const [backLinkRef, setBackLinkRef] = useState('/')

  useEffect(() => {
    if (router.pathname === '/blog') {
      setBackLinkRef('/')
      setBackLinkLabel('home')
    } else {
      setBackLinkRef('/blog')
      setBackLinkLabel('blog')
    }

  }, [router])

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="../logo.svg" />
        <meta
          name="description"
          content="This is Parichay's blog using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <div className={styles.backToHome}>
          <Link href={backLinkRef}>
            <a className={blogStyles.blog__postLink}>← Back to {backLinkLabel}</a>
          </Link>
        </div>
        {children}
      </main>
    </div>
  )
}
