const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 3200 -> "₹3,200" */
export function formatINR(value: number): string {
  return inr.format(value).replace(/\u00A0/g, "");
}

/** 3200 -> "₹3200.00" (payment sheet format, no grouping) */
export function formatINRPlain(value: number): string {
  return `₹${value.toFixed(2)}`;
}
