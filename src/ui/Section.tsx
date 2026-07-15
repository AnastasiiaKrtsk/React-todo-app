type SectionProps = {
  children: React.ReactNode;
  className?: string;
};
export const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={`px-4 md:px-8 lg:px-12 mt-4 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
};
