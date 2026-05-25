import fs from 'node:fs';
import path from 'node:path';
// Static imports so next/image generates an auto-blurred placeholder at
// build time (no manual blurDataURL upkeep).
import catDark from '../../public/images/parichay-cat.jpg';
import catLight from '../../public/images/parichay-cat-white.jpg';
import Postit from '../Common/Postit';
import Tape from '../Common/Tape';
import HeroPolaroid from './HeroPolaroid';
import styles from './hero.module.css';

const CAT_ALT = "Parichay's avatar — a red tabby cat wearing DJ headphones";

interface CurrentCityShape {
  city?: string;
}

function readCurrentCity(): string {
  try {
    const file = path.join(process.cwd(), 'content', 'currentCity.json');
    if (!fs.existsSync(file)) return 'somewhere ☀️';
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw) as CurrentCityShape;
    return parsed.city?.trim() || 'somewhere ☀️';
  } catch {
    return 'somewhere ☀️';
  }
}

/**
 * Scrapbook hero — renders BOTH desktop scrapbook spread and mobile stacked
 * composition. CSS @media queries in hero.module.css hide the wrong one at
 * each breakpoint (Arch 1A — pure CSS, no JS hook, no hydration risk).
 */
export default function Hero() {
  const city = readCurrentCity();

  const polaroid = (
    <div className={styles.polaroidFrame} data-wobble>
      {/* D2: Washi-tape strip stuck to the WALL above the polaroid top edge —
          most of the tape sits above the frame with the bottom ~1/3 over the
          paper. Reads as "pinned to a corkboard" instead of laid over the
          photo. */}
      <Tape
        rotate={-8}
        style={{
          position: 'absolute',
          left: '50%',
          top: -12,
          marginLeft: -36,
          width: 72,
          height: 18,
          zIndex: 3,
        }}
      />
      <HeroPolaroid srcLight={catLight} srcDark={catDark} alt={CAT_ALT} />
    </div>
  );

  const name = <h1 className={styles.name}>hey, i&apos;m parichay</h1>;

  const signal = <p className={styles.signal}>software engineer · dj</p>;

  const bio = (
    <p className={styles.bio}>
      i love working with data + cryptography. when i&apos;m not working —
      i&apos;m touching grass, learning to dj, trading crypto, playing ps5 or
      football.
    </p>
  );

  const cityPostit = (
    <Postit color={1} rotate={3} className={styles.postitCity}>
      currently in:
      <br />
      <b>{city}</b>
    </Postit>
  );

  const djPostit = (
    <Postit color={2} rotate={-4} className={styles.postitDj}>
      dj sets →
      <br />
      <a
        href="https://www.mixcloud.com/jake_fk/"
        target="_blank"
        rel="noreferrer"
        className={styles.postitLink}
      >
        mixcloud.com/jake_fk
      </a>
    </Postit>
  );

  return (
    <section id="home" className={styles.hero}>
      {/* Desktop scrapbook spread */}
      <div className={styles.desktop}>
        <div className={styles.polaroidColumn}>{polaroid}</div>
        <div className={styles.textColumn}>
          {name}
          {signal}
          {bio}
          <div className={styles.desktopPostits}>
            {cityPostit}
            {djPostit}
          </div>
        </div>
      </div>

      {/* Mobile stacked composition */}
      <div className={styles.mobile}>
        <div className={styles.mobilePolaroid}>{polaroid}</div>
        {name}
        {signal}
        {bio}
        <div className={styles.mobilePostits}>
          {cityPostit}
          {djPostit}
        </div>
      </div>
    </section>
  );
}
