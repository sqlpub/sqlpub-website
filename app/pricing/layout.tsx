export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-6xl p-8 md:p-12">
        {children}
      </div>
    </div>
  );
}
