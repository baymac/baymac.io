import { describe, expect, it } from 'bun:test';

describe('test infrastructure smoke', () => {
  it('the runner runs', () => {
    expect(1 + 1).toBe(2);
  });
});
