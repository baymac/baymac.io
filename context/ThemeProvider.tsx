'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  DEFAULT_THEME,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from '../lib/themeScript';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.setAttribute(THEME_ATTRIBUTE, resolved);
  root.style.colorScheme = resolved;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export default function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME as Theme,
}: ThemeProviderProps) {
  // SSR-safe initial state. The inline themeScript already applied the right
  // data-theme attribute to <html> before paint, so we only need React state
  // to drive useTheme() consumers.
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    defaultTheme === 'system' ? 'dark' : (defaultTheme as ResolvedTheme)
  );

  // Hydrate from localStorage once mounted.
  useEffect(() => {
    let stored: Theme;
    try {
      stored =
        (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) ??
        defaultTheme;
    } catch {
      stored = defaultTheme;
    }
    setThemeState(stored);
  }, [defaultTheme]);

  // Recompute resolvedTheme + sync DOM whenever theme changes. When theme is
  // 'system', also listen for live OS-level color-scheme changes.
  useEffect(() => {
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const apply = () => {
        const r: ResolvedTheme = mq.matches ? 'dark' : 'light';
        setResolvedTheme(r);
        applyTheme(r);
      };
      apply();
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
    const r = theme as ResolvedTheme;
    setResolvedTheme(r);
    applyTheme(r);
  }, [theme]);

  // Cross-tab sync: mirror toggles made in other tabs of the same origin.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        setThemeState(e.newValue as Theme);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, blocked storage) — state
      // still updates in-memory for the current session.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
