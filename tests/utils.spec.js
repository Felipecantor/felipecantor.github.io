import { describe, it, expect } from 'vitest';

function sanitizeString(input) {
  return String(input).trim().toLowerCase();
}

describe('sanitizeString', () => {
  it('trims and lowercases', () => {
    expect(sanitizeString('  HeLLo  ')).toBe('hello');
  });
});