import homeStyles from "./home.module.css";
import {
  UilGithub,
  UilLinkedin,
  UilJackhammer,
} from "@iconscout/react-unicons";
import rootStyles from "./root.module.css";
import cn from "classnames";
import Image from "next/image";
import dynamic from 'next/dynamic'

const BlogButton = dynamic(() => import('./BlogButton/BlogButton'), { ssr: false })

export default function Main() {

  return (
    <section className={cn(homeStyles.section)} id="home">
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
        <div className={homeStyles.home__underConstructionFlex}>
          <div
            className={cn(
              homeStyles.home__underConstructionContainer,
              rootStyles.grid
            )}
          >
            <UilJackhammer className={homeStyles.home__underConstructionIcon} />
            <h2 className={homeStyles.home__underConstructionText}>
              This website is under construction so a few features might not
              work
            </h2>
            <UilJackhammer className={homeStyles.home__underConstructionIcon} />
          </div>
        </div>
      </div>
    </section>
  );
}
