// Convierte números grandes a formato legible
// 1429000000 → "1.4B"
// 340000000  → "340M"
export function formatPopulation(number) {
  if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(1)}B`
  }
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(0)}M`
  }
  return number.toLocaleString()
}