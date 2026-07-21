import type { RootState } from './store';

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectFilter = (state: RootState) => state.tasks.filter;

export const selectSorter = (state: RootState) => state.tasks.sorter;
