import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={twMerge(
        'bg-button text-text px-2 py-1 rounded hover:cursor-pointer',
        className,
      )}
    >
      {children}
    </button>
  );
};
