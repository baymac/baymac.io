import { describe, expect, it } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import Postit from '../../../components/Common/Postit';

describe('Postit primitive', () => {
  it('renders children', () => {
    const html = renderToStaticMarkup(<Postit>hello</Postit>);
    expect(html).toContain('hello');
  });

  it('applies the default color class (color1)', () => {
    const html = renderToStaticMarkup(<Postit>x</Postit>);
    expect(html).toMatch(/color1/);
  });

  it('applies the requested color class', () => {
    const html = renderToStaticMarkup(<Postit color={3}>x</Postit>);
    expect(html).toMatch(/color3/);
  });

  it('applies a rotation transform', () => {
    const html = renderToStaticMarkup(<Postit rotate={-4}>x</Postit>);
    expect(html).toContain('rotate(-4deg)');
  });

  it('merges custom inline styles after the transform', () => {
    const html = renderToStaticMarkup(
      <Postit rotate={2} style={{ width: '150px' }}>
        x
      </Postit>
    );
    expect(html).toContain('rotate(2deg)');
    expect(html).toContain('width:150px');
  });
});
