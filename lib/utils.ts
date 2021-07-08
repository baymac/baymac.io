export function getOccurence(str: string, chr: string) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === chr) {
      count++;
    }
  }
  return count;
}

export function pathContainsModalPathQuery(
  path: string,
  modalRoutePath: string
) {
  if (path.includes(`?${modalRoutePath}=1`)) {
    return true;
  }
  return false;
}

export function removeQueryParamFromPath(path: string) {
  return path.substr(0, path.indexOf('?'));
}
