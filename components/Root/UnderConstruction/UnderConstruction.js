import {
    UilJackhammer
} from "@iconscout/react-unicons";
import rootStyles from "../root.module.css";
import styles from './underconstruction.module.css';
import cn from "classnames";

export default function UnderConstruction() {
    return <section className={cn(rootStyles.section, styles.underConstructionFlex)}>
        <div
            className={cn(
                rootStyles.container,
                rootStyles.grid,
                styles.underConstructionContainer,
            )}
        >
            <UilJackhammer className={styles.underConstructionIcon} />
            <h2 className={styles.underConstructionText}>
                This website is under construction so a few features might not
                work
            </h2>
            <UilJackhammer className={styles.underConstructionIcon} />
        </div>
    </section>
}