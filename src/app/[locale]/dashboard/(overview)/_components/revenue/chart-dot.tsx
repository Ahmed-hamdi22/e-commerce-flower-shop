// Custom dot component to highlight the max value point on the chart
export default function ChartDot({ cx, cy, payload, maxValue, formatCurrency }: any) {
  // Only render the dot if the current value is the max value
  if (payload.value !== maxValue) return null;

  return (
    <>
      {/* Highlighted point */}
      <circle cx={cx} cy={cy} r={6} fill="#0063D0" stroke="#fff" strokeWidth={2} />

      {/* Text label above the dot showing the formatted revenue */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#0063D0" fontWeight="bold" fontSize={12}>
        {formatCurrency(payload.value)}
      </text>
    </>
  );
}
