import {
  UilGithub,
  UilLinkedin
} from "@iconscout/react-unicons";
import cn from "classnames";
import dynamic from 'next/dynamic';
import Image from "next/image";
import homeStyles from "./home.module.css";
import rootStyles from "./root.module.css";

const BlogButton = dynamic(() => import('./BlogButton/BlogButton'), { ssr: false })

export default function Main() {

  return (
    <section className={cn(rootStyles.section)} id="home">
      <div
        className={cn(
          homeStyles.home__container,
          rootStyles.container,
          rootStyles.grid
        )}
      >
        <div className={cn(homeStyles.home__content, rootStyles.grid)}>
          <div className={cn(homeStyles.home__social, rootStyles.grid)}>
            <a
              href="https://github.com/baymac"
              target="_blank"
              className={homeStyles.home__social_icon}
            >
              <UilGithub />
            </a>
            <a
              href="https://linkedin.com/in/parichaybarpanda"
              target="_blank"
              className={homeStyles.home__social_icon}
            >
              <UilLinkedin />
            </a>
          </div>
          <div className={homeStyles.home__img}>
            <Image
              priority
              src="/images/profile.png"
              className={homeStyles.profileImage}
              height={150}
              width={150}
              alt={"Parichay"}
            />
          </div>
          <div className={homeStyles.home__data}>
            <h1 className={homeStyles.home__title}>Hi, I am Parichay</h1>
            <h3 className={homeStyles.home__subtitle}>Software Engineer</h3>
            <p className={homeStyles.home__description}>
              High level experience in web design and bla bla bla..
            </p>
            <BlogButton />
          </div>
        </div>
      </div>
    </section>
  );
}
