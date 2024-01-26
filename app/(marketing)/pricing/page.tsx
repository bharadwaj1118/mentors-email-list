import PricingDiscount from "@/components/home/pricing-discount";
import PricingTables from "@/components/home/pricing-table";

export const metadata = {
  title: "Pricing - Simple",
  description: "Page description",
};

export default function Pricing() {
  return (
    <>
      <PricingTables />
      <div className="m-3 sm:mb-6">
        <PricingDiscount />
      </div>
    </>
  );
}
