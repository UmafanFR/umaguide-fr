export function getRankFrom(value: number): string {
  const letters = ['g', 'f', 'e', 'd', 'c', 'b', 'a', 's'];
  if (value <= 1199) {
    const grades = [...letters, 'ss'];
    const idx = Math.floor(value / 50);
    const grade = grades[Math.floor(idx / 2)];
    return grade + (idx % 2 === 1 ? 'plus' : '');
  }
  if (value === 1200) return 'ssplus';
  const base = value - 1201;
  const block = Math.floor(base / 100);
  const letter = letters[block] ?? 's';
  const offset = base % 100;
  if (offset < 10) return `u${letter}`;
  const digit = Math.floor(offset / 10);
  return `u${letter}${digit}`;
}
