const KEY = 'tasks';
export const saveTasks = (tasks) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

export const loadTasks = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};
