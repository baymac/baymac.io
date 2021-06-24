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
    <main>
      {children}
    </main>
  )
}
