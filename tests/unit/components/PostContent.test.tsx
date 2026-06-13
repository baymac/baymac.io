/**
 * Unit tests for PostContent + CopyButtonHandler.
 *
 * PostContent (server component) renders the HTML string and mounts
 * CopyButtonHandler ('use client'), which:
 *  - Attaches a delegated click handler to the [data-post-content] div
 *  - On click of a .copy-btn, finds the nearest <pre><code> and calls
 *    navigator.clipboard.writeText()
 *  - On success: sets data-copied="true" and aria-label="Copied!" for 2 s
 *  - On clipboard failure: silently returns (no state change)
 *  - On re-click during countdown: clears the existing timer and restarts
 *  - On unmount: removes the event listener and clears all pending timers
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
  mock,
} from 'bun:test';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import PostContent from '../../../components/Blog/PostContent';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let container: HTMLDivElement;
let root: Root;

// Track the fake clipboard
let clipboardWriteText: ReturnType<typeof mock>;

function setupClipboard(rejects = false) {
  clipboardWriteText = mock(() =>
    rejects ? Promise.reject(new Error('no permission')) : Promise.resolve()
  );
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: clipboardWriteText },
    writable: true,
    configurable: true,
  });
}

async function render(html: string) {
  await act(async () => {
    root = createRoot(container);
    root.render(<PostContent contentHtml={html} />);
  });
}

async function unmount() {
  await act(async () => {
    root?.unmount();
  });
}

function getContainer(): HTMLDivElement {
  return container.querySelector('div') as HTMLDivElement;
}

function makePre(code = 'console.log("hi");'): string {
  return `<pre><code>${code}</code><button class="copy-btn" type="button" aria-label="Copy code"><span class="copy-icon"></span><span class="check-icon"></span></button></pre>`;
}

// Click the .copy-btn inside the rendered container
async function clickCopyBtn(btn?: Element | null) {
  const target = btn ?? container.querySelector('.copy-btn');
  expect(target).not.toBeNull();
  await act(async () => {
    (target as HTMLElement).click();
    // Let the async onClick handler resolve
    await Promise.resolve();
    await Promise.resolve();
  });
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  document.body.innerHTML = '';
  container = document.createElement('div');
  document.body.appendChild(container);
  setupClipboard(false);
});

afterEach(async () => {
  await unmount();
  document.body.innerHTML = '';
});

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

describe('PostContent — rendering', () => {
  it('renders the HTML string into a div', async () => {
    await render('<p>Hello <strong>world</strong></p>');
    expect(container.querySelector('strong')?.textContent).toBe('world');
  });

  it('applies the blog__contentFont class to the wrapper div', async () => {
    await render('<p>x</p>');
    const div = getContainer();
    // CSS Modules identity plugin maps class names to themselves
    expect(div.className).toContain('blog__contentFont');
  });
});

// ---------------------------------------------------------------------------
// Click handler — success path
// ---------------------------------------------------------------------------

describe('PostContent — clipboard success', () => {
  it('calls navigator.clipboard.writeText with the code block text', async () => {
    await render(makePre('alert(1)'));
    await clickCopyBtn();
    expect(clipboardWriteText).toHaveBeenCalledTimes(1);
    expect(clipboardWriteText.mock.calls[0][0]).toContain('alert(1)');
  });

  it('sets data-copied="true" on the button after copy', async () => {
    await render(makePre());
    const btn = container.querySelector('.copy-btn') as HTMLButtonElement;
    await clickCopyBtn(btn);
    expect(btn.dataset.copied).toBe('true');
  });

  it('sets aria-label="Copied!" on the button after copy', async () => {
    await render(makePre());
    const btn = container.querySelector('.copy-btn') as HTMLButtonElement;
    await clickCopyBtn(btn);
    expect(btn.getAttribute('aria-label')).toBe('Copied!');
  });

  it('resets data-copied and aria-label after 2 000 ms', async () => {
    jest.useFakeTimers();
    try {
      await render(makePre());
      const btn = container.querySelector('.copy-btn') as HTMLButtonElement;
      await clickCopyBtn(btn);

      act(() => {
        jest.advanceTimersByTime(2100);
      });

      expect(btn.dataset.copied).toBeUndefined();
      expect(btn.getAttribute('aria-label')).toBe('Copy code');
    } finally {
      jest.useRealTimers();
    }
  });
});

// ---------------------------------------------------------------------------
// Click handler — failure path
// ---------------------------------------------------------------------------

describe('PostContent — clipboard failure', () => {
  it('does NOT set data-copied when clipboard.writeText rejects', async () => {
    setupClipboard(true); // clipboard will reject
    await render(makePre());
    const btn = container.querySelector('.copy-btn') as HTMLButtonElement;
    await clickCopyBtn(btn);
    expect(btn.dataset.copied).toBeUndefined();
  });

  it('does NOT change aria-label when clipboard fails', async () => {
    setupClipboard(true);
    await render(makePre());
    const btn = container.querySelector('.copy-btn') as HTMLButtonElement;
    await clickCopyBtn(btn);
    expect(btn.getAttribute('aria-label')).toBe('Copy code');
  });

  it('clipboard.writeText is still called (attempt is made before catch)', async () => {
    setupClipboard(true);
    await render(makePre());
    await clickCopyBtn();
    expect(clipboardWriteText).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Click target filtering — closest('.copy-btn') behavior
// ---------------------------------------------------------------------------

describe('PostContent — click delegation', () => {
  it('ignores clicks on elements that are not inside .copy-btn', async () => {
    await render(`<p id="para">text</p>${makePre()}`);
    await act(async () => {
      (container.querySelector('#para') as HTMLElement).click();
      await Promise.resolve();
    });
    expect(clipboardWriteText).not.toHaveBeenCalled();
  });

  it('works when a child element inside .copy-btn is clicked (event target != button)', async () => {
    await render(makePre());
    // Click the .copy-icon span inside the button — closest('.copy-btn') should
    // still resolve to the button.
    const icon = container.querySelector('.copy-icon');
    await clickCopyBtn(icon);
    expect(clipboardWriteText).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Pre without <code> child — graceful fallback
// ---------------------------------------------------------------------------

describe('PostContent — code text extraction', () => {
  it('uses <code> innerText when present', async () => {
    await render(
      '<pre><code>foo bar</code><button class="copy-btn" type="button" aria-label="Copy code"></button></pre>'
    );
    await clickCopyBtn();
    expect(clipboardWriteText.mock.calls[0][0]).toContain('foo bar');
  });

  it('falls back to pre innerText when no <code> child exists', async () => {
    // A <pre> with no <code> — the fallback `?? pre` branch is exercised.
    await render(
      '<pre>raw text<button class="copy-btn" type="button" aria-label="Copy code"></button></pre>'
    );
    await clickCopyBtn();
    expect(clipboardWriteText).toHaveBeenCalledTimes(1);
    expect(clipboardWriteText.mock.calls[0][0]).toContain('raw text');
  });
});

// ---------------------------------------------------------------------------
// Timer de-duplication (rapid re-click)
// ---------------------------------------------------------------------------

describe('PostContent — timer deduplication', () => {
  it('cancels the existing timer when the same button is clicked again within 2 s', async () => {
    await render(makePre());
    const btn = container.querySelector('.copy-btn') as HTMLButtonElement;

    // First click
    await clickCopyBtn(btn);
    expect(btn.dataset.copied).toBe('true');

    // Second click immediately after (timer should restart, not stack)
    await clickCopyBtn(btn);
    expect(clipboardWriteText).toHaveBeenCalledTimes(2);
    // button is still in copied state
    expect(btn.dataset.copied).toBe('true');
  });
});

// ---------------------------------------------------------------------------
// Multiple copy buttons on the same page
// ---------------------------------------------------------------------------

describe('PostContent — multiple code blocks', () => {
  it('copies the right code for each of several code blocks', async () => {
    const html = `
      <pre><code>block-one</code><button class="copy-btn" type="button" aria-label="Copy code"></button></pre>
      <pre><code>block-two</code><button class="copy-btn" type="button" aria-label="Copy code"></button></pre>
    `;
    await render(html);
    const btns = container.querySelectorAll('.copy-btn');
    expect(btns.length).toBe(2);

    await clickCopyBtn(btns[1]);
    expect(clipboardWriteText.mock.calls[0][0]).toContain('block-two');
  });
});

// ---------------------------------------------------------------------------
// Cleanup on unmount
// ---------------------------------------------------------------------------

describe('PostContent — unmount cleanup', () => {
  it('removes the click listener (no calls after unmount)', async () => {
    await render(makePre());

    // Capture button reference BEFORE unmounting so the click is guaranteed to
    // exercise the detached-listener code path.
    const btn = container.querySelector('.copy-btn') as HTMLButtonElement;
    expect(btn).not.toBeNull();

    await unmount();

    await act(async () => {
      btn.click();
      await Promise.resolve();
    });
    expect(clipboardWriteText).not.toHaveBeenCalled();
  });
});
