import mainStyles from "./main.module.css";
import { UilGithub, UilLinkedin, UilPen, UilJackhammer } from "@iconscout/react-unicons";
import rootStyles from "./root.module.css";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <main className={cn(mainStyles.section)} id="home">
      <div
        className={cn(
          mainStyles.home__container,
          rootStyles.container,
          rootStyles.grid
        )}
      >
        <div className={cn(mainStyles.home__content, rootStyles.grid)}>
          <div className={cn(mainStyles.home__social, rootStyles.grid)}>
            <a
              href="https://github.com/baymac"
              target="_blank"
              className={mainStyles.home__social_icon}
            >
              <UilGithub />
            </a>
            <a
              href="https://linkedin.com/in/parichaybarpanda"
              target="_blank"
              className={mainStyles.home__social_icon}
            >
              <UilLinkedin />
            </a>
          </div>
          <div className={mainStyles.home__img}>
            <Image
              priority
              src="/images/profile.png"
              className={mainStyles.profileImage}
              height={150}
              width={150}
              alt={"Parichay"}
            />
          </div>
          <div className={mainStyles.home__data}>
            <h1 className={mainStyles.home__title}>Hi, I am Parichay</h1>
            <h3 className={mainStyles.home__subtitle}>Software Engineer</h3>
            <p className={mainStyles.home_description}>
              High level experience in web design and bla bla bla..
            </p>
            <Link href="/blog">
              <a className={cn(mainStyles.blogButton)}>
                Blog
                <UilPen />
              </a>
            </Link>
          </div>
        </div>
        <div className={mainStyles.underConstructionFlex}>
          <div className={cn(mainStyles.underConstructionContainer, rootStyles.grid)}>
            <UilJackhammer className={mainStyles.underConstructionIcon} />
            <h2 style={{ textAlign: 'center' }}>This website is under construction so a few features might not work</h2>
            <UilJackhammer className={mainStyles.underConstructionIcon} />
          </div>
        </div>
      </div>
    </main>
  );
}
