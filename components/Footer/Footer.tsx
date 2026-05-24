import { UilGithub, UilLinkedin, UilTwitter } from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import rootStyles from '../../styles/root.module.css';
import footerStyles from './footer.module.css';

// Mixcloud user handle. Placeholder per plan T17 — owner can swap to their real
// handle. Matches the prototype's `mixcloud.com/jake_fk` postit reference.
const MIXCLOUD_USER_URL = 'https://www.mixcloud.com/jake_fk/';
const MIXCLOUD_OEMBED_URL = `https://www.mixcloud.com/oembed/?url=${encodeURIComponent(
  MIXCLOUD_USER_URL
)}&format=json`;

interface MixcloudOEmbed {
  html?: string;
  title?: string;
  author_name?: string;
}

async function fetchMixcloudEmbed(): Promise<MixcloudOEmbed | null> {
  try {
    const res = await fetch(MIXCLOUD_OEMBED_URL, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as MixcloudOEmbed;
    if (!data?.html) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Add `loading="lazy"` to the iframe in the oEmbed HTML (Perf 4B). Mixcloud's
 * oEmbed doesn't include the attribute by default, so we patch it in.
 */
function withLazyIframe(html: string): string {
  if (/<iframe[^>]*\sloading=/.test(html)) return html;
  return html.replace(/<iframe\b/i, '<iframe loading="lazy"');
}

function SocialIcons() {
  return (
    <div className={footerStyles.footer__social}>
      <a
        href="https://github.com/baymac"
        target="_blank"
        rel="noreferrer"
        className={cn(
          footerStyles.footer__social_icon,
          footerStyles.footer__social_icon_gh
        )}
        aria-label="github"
      >
        <UilGithub />
      </a>
      <a
        href="https://x.com/parichayayy"
        target="_blank"
        rel="noreferrer"
        className={cn(
          footerStyles.footer__social_icon,
          footerStyles.footer__social_icon_gh
        )}
        aria-label="x"
      >
        <UilTwitter />
      </a>
      <a
        href="https://linkedin.com/in/parichaybarpanda"
        target="_blank"
        rel="noreferrer"
        className={footerStyles.footer__social_icon}
        aria-label="linkedin"
      >
        <UilLinkedin />
      </a>
    </div>
  );
}

function SignOff() {
  return (
    <p className={footerStyles.footer__signoff}>
      &copy; parichay &middot; baymac.lol &middot; made with rolling bassline
      energy
    </p>
  );
}

function FallbackFooter() {
  return (
    <div
      className={cn(
        rootStyles.grid,
        rootStyles.container,
        footerStyles.footer__container
      )}
    >
      <ul className={footerStyles.footer__links_1}>
        <li>
          <Link href="/" className={footerStyles.footer__link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className={footerStyles.footer__link}>
            Blog
          </Link>
        </li>
      </ul>
      <ul className={footerStyles.footer__links_2}>
        <li>
          <Link href="/buymecrypto" className={footerStyles.footer__link}>
            Buy Me Crypto
          </Link>
        </li>
      </ul>
      <SocialIcons />
    </div>
  );
}

export default async function Footer() {
  const embed = await fetchMixcloudEmbed();
  const embedHtml = embed?.html ? withLazyIframe(embed.html) : null;

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer__bg}>
        {embedHtml ? (
          <div
            className={cn(
              rootStyles.container,
              footerStyles.footer__now_playing
            )}
          >
            <div className={footerStyles.footer__now_playing_label}>
              now playing
            </div>
            <div
              className={footerStyles.footer__mixcloud}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Mixcloud oEmbed returns trusted iframe markup; revalidated server-side.
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
            <div className={footerStyles.footer__now_playing_meta}>
              <SocialIcons />
            </div>
            <SignOff />
          </div>
        ) : (
          <>
            <FallbackFooter />
            <div
              className={cn(
                rootStyles.container,
                footerStyles.footer__signoff_wrap
              )}
            >
              <SignOff />
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
