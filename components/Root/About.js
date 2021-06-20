import rootStyles from "./root.module.css";
import cn from "classnames";
import Image from "next/image";
import styles from './about.module.css'

export default function About() {

    return <section className={cn(rootStyles.section, styles.about__section)} id="aboutme">
        <div
            className={cn(
                rootStyles.container,
                rootStyles.grid,
                styles.about__container
            )}
        >
            <h2 className={styles.about__title}>Who I am</h2>
            <p className={styles.about__subtitle}>I am software engineer based out of Bengaluru, India</p>
            <div className={styles.about__description}>
                <p>[Unimplemented]</p>
            </div>
            <div className={styles.about__image}>
                <Image
                    priority
                    src="/images/profile.png"
                    height={300}
                    width={200}
                    alt={"Parichay"}
                />
            </div>
        </div>
    </section>
}