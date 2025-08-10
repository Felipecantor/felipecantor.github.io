import { describe, it, expect } from 'vitest';

// Reutilizamos una función pura similar a sanitize de ejemplo
function normalizeTitle(input) {
  return String(input)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
}

describe('normalizeTitle', () => {
  it('normaliza, remueve acentos, trim y lower', () => {
    expect(normalizeTitle('  ÁnÁlísÍs De DATos  ')).toBe('analisis de datos');
  });

  it('convierte cualquier valor a string y normaliza', () => {
    expect(normalizeTitle(12345)).toBe('12345');
  });
});