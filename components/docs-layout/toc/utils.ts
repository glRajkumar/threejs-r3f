
export function removeLeadingNumber(str: string): string {
  return str.replace(/^\d+[\.\-\s]*/, "").trim()
}

export function getItemOffset(level: number): number {
  if (level <= 2) return 16
  if (level === 3) return 32
  return 48
}

export function getLineOffset(level: number): number {
  return level >= 3 ? 12 : 0
}
