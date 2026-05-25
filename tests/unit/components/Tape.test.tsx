import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Tape from '../../../components/Common/Tape';

describe('Tape primitive', () => {
  it('is aria-hidden (decorative)', () => {
    const html = renderToStaticMarkup(<Tape />);
    expect(html).toContain('aria-hidden="true"');
  });

  it('accepts rotation', () => {
    const html = renderToStaticMarkup(<Tape rotate={-12} />);
    expect(html).toContain('rotate(-12deg)');
  });

  it('merges positioning styles from consumer', () => {
    const html = renderToStaticMarkup(<Tape style={{ left: 30, top: -10 }} />);
    expect(html).toContain('left:30px');
    expect(html).toContain('top:-10px');
  });
});
