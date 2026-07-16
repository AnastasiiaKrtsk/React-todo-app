import { loadTasks, saveTasks } from './storage.js';

export const state = {
  tasks: loadTasks(),
  currentFilter: 'all',
  page: 1,
  sort: 'newest',
};

export const addTaskAction = (data) => {
  state.tasks.push(data);
  saveTasks(state.tasks);
};

export const deleteTaskAction = (id) => {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveTasks(state.tasks);
};

export const setTaskActiveAction = (id) => {
  const task = state.tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  saveTasks(state.tasks);
};

export const setCurrentFilterAction = (filter) => {
  state.currentFilter = filter;
};

export const setSorting = (sorter) => {
  state.sort = sorter;
};
