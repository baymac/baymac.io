import {
    UilPen
} from "@iconscout/react-unicons";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive'
import styles from './blogbutton.module.css'
import cn from "classnames";

export default function BlogButton() {

    const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })

    return <Link href="/blog">
        <a className={cn(styles.blogButton, {
            [styles.blogButtonFlex]: !isBigScreen
        })}>
            Blog
            <UilPen />
        </a>
    </Link>
}