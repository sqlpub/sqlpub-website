export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center py-12 md:py-16">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
