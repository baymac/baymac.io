import { describe, expect, it } from 'vitest';

describe('test infrastructure smoke', () => {
  it('vitest runs', () => {
    expect(1 + 1).toBe(2);
  });
});
