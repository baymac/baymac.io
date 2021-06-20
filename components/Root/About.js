import rootStyles from "./root.module.css";
import cn from "classnames";
import Image from "next/image";

export default function About() {

    return <section className={cn(rootStyles.section)} id="aboutme">
        <div
            className={cn(
                rootStyles.container,
                rootStyles.grid
            )}
        >
            <p>About Me</p>
            <p>[Unimplemented]</p>
        </div>
    </section>
}