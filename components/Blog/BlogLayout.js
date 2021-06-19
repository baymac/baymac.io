import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import blogStyles from "../../styles/blog.module.css";
import styles from "./layout.module.css";
import useDarkMode̦ from '../../hooks/useDarkMode'

const name = "Parichay";
export const siteTitle = "Parichay's blog";

export default function BlogLayout({ children }) {

  useDarkMode̦()

  const router = useRouter()

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
      <header className={styles.header}>
        {router.pathname === 'blog' ? (
          <>
            <Image
              priority
              src="/images/profile.png"
              className={blogStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={blogStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.png"
                  className={blogStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={blogStyles.headingLg}>
              <Link href="/">
                <a className={blogStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>
        {children}
      </main>
      {router.pathname.startsWith('/posts') && (
        <div className={styles.backToHome}>
          <Link href="/blog">
            <a className={blogStyles.blog__postLink}>← Back to blog</a>
          </Link>
        </div>
      )}
      {router.pathname === '/blog' && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a className={blogStyles.blog__postLink}>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
