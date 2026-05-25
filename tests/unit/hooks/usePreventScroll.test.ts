import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import usePreventScroll from '../../../hooks/usePreventScroll';
import { renderHook } from '../../helpers/renderHook';

describe('usePreventScroll', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.className = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.body.className = '';
  });

  it('adds prevent-scroll body class and aria-hidden on #app-root when dep=true', async () => {
    const appRoot = document.createElement('div');
    appRoot.id = 'app-root';
    document.body.appendChild(appRoot);

    await renderHook(() => usePreventScroll(true));

    expect(document.body.classList.contains('prevent-scroll')).toBe(true);
    expect(appRoot.getAttribute('aria-hidden')).toBe('true');
  });

  it('removes prevent-scroll + aria-hidden when dep=false', async () => {
    const appRoot = document.createElement('div');
    appRoot.id = 'app-root';
    appRoot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(appRoot);
    document.body.classList.add('prevent-scroll');

    await renderHook(() => usePreventScroll(false));

    expect(document.body.classList.contains('prevent-scroll')).toBe(false);
    expect(appRoot.hasAttribute('aria-hidden')).toBe(false);
  });

  it('still toggles body class when #app-root is missing (no throw)', async () => {
    expect(document.getElementById('app-root')).toBeNull();

    await renderHook(() => usePreventScroll(true));

    expect(document.body.classList.contains('prevent-scroll')).toBe(true);
  });
});
