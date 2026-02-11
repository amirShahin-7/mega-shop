export const formatCurrency = (
  amount: number,
  currency: string = "EGP",
): string => {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
