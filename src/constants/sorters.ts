import type { Sorter, Task } from './task';

export const SORTERS: Record<
  Sorter,
  {
    label: string;
    fn: (a: Task, b: Task) => number;
  }
> = {
  newest: {
    label: 'Newest',
    fn: (a, b) => b.createdAt.localeCompare(a.createdAt),
  },

  oldest: {
    label: 'Oldest',
    fn: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },

  az: {
    label: 'A → Z',
    fn: (a, b) => a.title.localeCompare(b.title),
  },

  za: {
    label: 'Z → A',
    fn: (a, b) => b.title.localeCompare(a.title),
  },
};
