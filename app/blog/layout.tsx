export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center h-auto">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
