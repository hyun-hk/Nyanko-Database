export function calculateDPS(baseDPS: number, level: number): number {
    const levelMultiplier = Math.pow(1.5, level - 1);
    return Math.round(baseDPS * levelMultiplier);
  }