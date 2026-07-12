import type { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  className?: string;
};
export const Panel = ({ children, className }: PanelProps) => {
  return (
    <div
      className={`max-w-7xl min-w-y bg-panel px-2 py-1 md:px-3 lg:px-5 rounded border border-border ${className}`}
    >
      {children}
    </div>
  );
};
