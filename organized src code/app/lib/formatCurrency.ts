export function formatCurrency(
    amount: number,
    currencyCode: string = "PKR" // Changed to PKR
  ): string {
    try {
      return new Intl.NumberFormat("en-PK", { // Locale changed to en-PK
        style: "currency",
        currency: currencyCode.toUpperCase(),
      }).format(amount);
    } catch (error) {
      console.error("Invalid currency code:", currencyCode, error);
      return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
  }
  