import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getOccurence,
  pathContainsModalPathQuery,
  removeQueryParamFromPath
} from '../lib/utils';

// This hook returns route values required for navigate a route modal
export default function useModalRouteRedirect(
  modalRoutePath: string
): [string, string, string] {
  const router = useRouter();

  // The redirect route when the modal closes
  const [redirectRoute, setRedirectRoute] = useState('/');

  // The actual route next router resolves e.g. posts/[id] or /?buymecrypto=1
  const [hrefRoute, setHrefRoute] = useState('/');

  // The route browser displays to user e.g. posts/ssg-ssr or /buymecrypto
  const [asRoute, setAsRoute] = useState('/');

  // Uncomment to debug
  // console.log('redirect: ', redirectRoute);
  // console.log('href: ', hrefRoute);
  // console.log('as: ', asRoute);

  useEffect(() => {
    // Check that modalRoutePath query param does not exist in path else we do not need to modify the redirect route
    if (!router.query[`${modalRoutePath}`]) {
      // If it is not a first order route then we are using modalRoutePath as query param instead of a path as it is not support by nextjs
      if (getOccurence(router.pathname, '/') > 1) {
        // This check is made for 2nd order paths as initially router doesn't contain query param in query, only contains the path param, so have to check it from asPath
        if (!pathContainsModalPathQuery(router.asPath, modalRoutePath)) {
          setRedirectRoute(router.asPath);
          setHrefRoute(`${router.asPath}?${modalRoutePath}=1`);
          setAsRoute(`${router.asPath}?${modalRoutePath}=1`);
        } else {
          // Derive redirect path by removing query param
          setRedirectRoute(removeQueryParamFromPath(router.asPath));
        }
      } else {
        // For any first order route (including root) we just add query param with current route and add dummy modalRoutePath route
        setRedirectRoute(router.pathname);
        setHrefRoute(`${router.pathname}?${modalRoutePath}=1`);
        setAsRoute(`/${modalRoutePath}`);
      }
    }
  }, [asRoute, hrefRoute, modalRoutePath, redirectRoute, router]);

  // Return values correct for navigating to a route modal in the UI, but returns default value for href and asRoute when modal route is loaded directly (by visiting the route or refreshing)
  return [redirectRoute, hrefRoute, asRoute];
}
