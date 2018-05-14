export default function nearlyEqual(a: number, b: number, threshold = 10) {
  let minDelta = b * ((100 - threshold) / 100);
  let maxDelta = b * ((100 + threshold) / 100);

  return  minDelta <= a || a <= maxDelta;
}
