import All from '../assets/icons/all.svg';
import Work from '../assets/icons/work.svg';
import Health from '../assets/icons/health.svg';
import Personal from '../assets/icons/personal.svg';
import Completed from '../assets/icons/done.svg';
import type { Filter, Task } from '../App';

export const TASK_FILTERS: Record<
  Filter,
  {
    name: string;
    icon: string;
    fn: (task: Task) => boolean;
  }
> = {
  all: {
    name: 'All',
    icon: All,
    fn: () => true,
  },

  work: {
    name: 'Work',
    icon: Work,
    fn: (task) => task.label === 'work',
  },

  health: {
    name: 'Health',
    icon: Health,
    fn: (task) => task.label === 'health',
  },

  personal: {
    name: 'Personal',
    icon: Personal,
    fn: (task) => task.label === 'personal',
  },

  completed: {
    name: 'Completed',
    icon: Completed,
    fn: (task) => task.completed,
  },
};
