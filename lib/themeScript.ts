export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';
export const DEFAULT_THEME = 'dark';

/**
 * Inline script injected into <head> to set the theme before paint, avoiding
 * a light-mode flash for dark-mode users. Reads localStorage `theme` (set by
 * ThemeProvider); falls back to system preference when value is 'system' or
 * unset + no stored choice, then to DEFAULT_THEME on any error.
 */
export const themeScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var d='${DEFAULT_THEME}';var s=localStorage.getItem(k);var t=s||d;var r=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;var e=document.documentElement;e.setAttribute('${THEME_ATTRIBUTE}',r);e.style.colorScheme=r;}catch(e){document.documentElement.setAttribute('${THEME_ATTRIBUTE}','${DEFAULT_THEME}');}})();`;
