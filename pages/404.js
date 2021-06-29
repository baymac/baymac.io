import Link from 'next/link'
import styles from '../styles/error.module.css'

export default function FourOhFour() {
    return <div className={styles.container}>
        <div className={styles.message_wrapper}>
            <h1 className={styles.code}>404</h1>
            <h3 className={styles.message}>This page could not be found.</h3>
        </div>
        <Link href="/">
            <a>
                Go back home
            </a>
        </Link>
    </div>

}