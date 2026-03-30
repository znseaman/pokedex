export function cleanInput(input: string): string[] {
  return input
    .split(/\s/)
    .map((c) => c.toLowerCase())
    .filter((c) => c);
}
