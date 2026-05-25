// This file sets a custom webpack configuration to use your Next.js app
// https://nextjs.org/docs/api-reference/next.config.js/introduction

const moduleExports = {
  turbopack: {},
  // Move the Next.js dev-only build/route indicator out of the bottom-left
  // corner where it overlapped the footer in mobile previews (C12).
  devIndicators: {
    position: 'bottom-right',
  },
  // Dev-only: allow cross-origin requests (HMR WebSocket, server actions)
  // from tunneled origins so sharing a Cloudflare/ngrok preview URL doesn't
  // break hydration, theme toggle, or intercepting routes (e.g. the modal
  // form of /buymecrypto). Next.js 15+ blocks these by default.
  allowedDevOrigins: [
    '*.trycloudflare.com',
    '*.ngrok-free.app',
    '*.ngrok.io',
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

// Inspired from securityheaders.com and leerob.io
// Inspired from securityheaders.com and leerob.io
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src none;
  connect-src *;
  font-src 'self';
  frame-src https://www.mixcloud.com https://player-widget.mixcloud.com https://follow-widget.mixcloud.com;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

module.exports = moduleExports;
