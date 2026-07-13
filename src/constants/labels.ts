import type { Label } from '../App';

export const labelStyles: Record<
  Label,
  { border: string; bg: string; color: string }
> = {
  work: {
    border: 'border-task-work',
    bg: 'bg-task-work',
    color: 'text-task-work',
  },
  health: {
    border: 'border-green-500',
    bg: 'bg-green-500',
    color: 'text-task-health',
  },
  personal: {
    border: 'border-task-personal',
    bg: 'bg-task-personal',
    color: 'text-task-personal',
  },
  other: {
    border: 'border-gray-500',
    bg: 'bg-gray-500',
    color: 'text-gray-500',
  },
};
