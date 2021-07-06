import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

function getOccurence(str: string, chr: string) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === chr) {
      count++;
    }
  }
  return count;
}

function pathContainsModalPathQuery(path: string, modalRoutePath: string) {
  if (path.includes(`?${modalRoutePath}=1`)) {
    return true;
  }
  return false;
}

function removeQueryParamFromPath(path: string) {
  return path.substr(0, path.indexOf('?'));
}

// This hook returns route values required for navigate a route modal
export default function useModalRouteRedirect(
  modalRoutePath: string
): [string, string, string] {
  const router = useRouter();

  // The redirect route when the modal closes
  const redirectRoute = useRef('/');

  // The actual route next router resolves e.g. posts/[id] or /?buymecrypto=1
  const hrefRoute = useRef('/');

  // The route browser displays to user e.g. posts/ssg-ssr or /buymecrypto
  const asRoute = useRef('/');

  // Uncomment to debug
  // console.log('redirect: ', redirectRoute.current);
  // console.log('href: ', hrefRoute.current);
  // console.log('as: ', asRoute.current);

  useEffect(() => {
    // Check that modalRoutePath query param does not exist in path else we do not need to modify the redirect route
    if (!router.query[`${modalRoutePath}`]) {
      // If it is not a first order route then we are using modalRoutePath as query param instead of a path as it is not support by nextjs
      if (getOccurence(router.pathname, '/') > 1) {
        // This check is made for 2nd order paths as initially router doesn't contain query param in query, only contains the path param, so have to check it from asPath
        if (!pathContainsModalPathQuery(router.asPath, modalRoutePath)) {
          hrefRoute.current = `${router.asPath}?${modalRoutePath}=1`;
          asRoute.current = `${router.asPath}?${modalRoutePath}=1`;
          redirectRoute.current = router.asPath;
        } else {
          // Derive redirect path by removing query param
          redirectRoute.current = removeQueryParamFromPath(router.asPath);
        }
      } else {
        // For any first order route (including root) we just add query param with current route and add dummy modalRoutePath route
        redirectRoute.current = router.pathname;
        hrefRoute.current = `${router.pathname}?${modalRoutePath}=1`;
        asRoute.current = `/${modalRoutePath}`;
      }
    }
  }, [modalRoutePath, router]);

  // Return values correct for navigating to a route modal in the UI, but returns default value for href and asRoute when modal route is loaded directly (by visiting the route or refreshing)
  return [redirectRoute.current, hrefRoute.current, asRoute.current];
}
