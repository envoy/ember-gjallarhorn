export default function nearlyEqual(a: number, b: number, threshold = 5) {
  return Math.abs(a - b) <= threshold;
}
