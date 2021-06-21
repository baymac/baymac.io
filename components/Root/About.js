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
            <p className={styles.about__subtitle}>Software engineer and open source enthusiast based out of Bengaluru, India</p>
            <div className={styles.about__description}>
                <p >[Unimplemented]</p>
                <p >[Unimplemented]</p>
                <p >[Unimplemented]</p>
                <p >[Unimplemented]</p>
                <p >[Unimplemented]</p>
            </div>
            <div className={styles.about__img}>
                <Image
                    priority
                    src="/images/panda.jpeg"
                    height={300}
                    width={200}
                    alt={"Parichay"}
                    layout="intrinsic"
                />
            </div>
        </div>
    </section>
}