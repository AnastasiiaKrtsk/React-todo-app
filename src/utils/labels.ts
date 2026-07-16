import type { Label } from './tasks';

export const labelStyles: Record<
  Label,
  {
    border: string;
    text: string;
    bg: string;
  }
> = {
  work: {
    border: 'border-blue-500/30',
    text: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },

  health: {
    border: 'border-green-500/30',
    text: 'text-green-500',
    bg: 'bg-green-500/10',
  },

  personal: {
    border: 'border-amber-500/30',
    text: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },

  other: {
    border: 'border-gray-500/30',
    text: 'text-gray-500',
    bg: 'bg-gray-500/10',
  },
};

export const statusStyles: Record<
  Label,
  {
    border: string;
    bg: string;
  }
> = {
  work: {
    border: 'border-blue-500/50',
    bg: 'bg-blue-700',
  },

  health: {
    border: 'border-green-500/50',
    bg: 'bg-green-700',
  },

  personal: {
    border: 'border-amber-500/50',
    bg: 'bg-amber-700',
  },

  other: {
    border: 'border-gray-500/50',
    bg: 'bg-gray-700',
  },
};
