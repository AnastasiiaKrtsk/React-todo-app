import { twMerge } from 'tailwind-merge';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
};
export const Panel = ({ children, className }: PanelProps) => {
  return (
    <div
      className={twMerge(
        'w-full max-w-7xl bg-panel px-2 py-1 md:px-3 lg:px-5 rounded border border-border ',
        className,
      )}
    >
      {children}
    </div>
  );
};
