import { UilPen } from "@iconscout/react-unicons";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import styles from "./blogbutton.module.css";
import cn from "classnames";

export default function BlogButton() {
    return (
        <Link href="/blog">
            <a className={cn(styles.blogButton, styles.blogButtonFlex)}>
                Blog
                <UilPen />
            </a>
        </Link>
    );
}
