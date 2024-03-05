import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM, yyyy", { locale: enUS });
  return formattedDate;
}
