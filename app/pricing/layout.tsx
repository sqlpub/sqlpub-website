import { Card } from "@heroui/card";

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center">
      <Card className="w-full max-w-6xl p-8 md:p-12 rounded-2xl shadow-xl bg-transparent shadow-none">
        {children}
      </Card>
    </div>
  );
}
