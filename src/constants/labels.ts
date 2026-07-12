import type { Label } from '../constants/task';

export const labelStyles: Record<
  Label,
  {
    border: string;
    text: string;
    bg: string;
  }
> = {
  work: {
    border: 'border-blue-500',
    text: 'text-blue-500',
    bg: 'bg-blue-500',
  },

  health: {
    border: 'border-green-500',
    text: 'text-green-500',
    bg: 'bg-green-500',
  },

  personal: {
    border: 'border-amber-500',
    text: 'text-amber-500',
    bg: 'bg-amber-500',
  },

  other: {
    border: 'border-gray-500',
    text: 'text-gray-500',
    bg: 'bg-gray-500',
  },
};
