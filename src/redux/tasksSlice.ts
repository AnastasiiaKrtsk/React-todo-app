import { createSlice } from '@reduxjs/toolkit';
import type { Filter, Sorter, Task } from '../utils/tasks';
import { getTasksFromStorage } from '../utils/storage';
import type { PayloadAction } from '@reduxjs/toolkit';
type AddTaskPayload = {
  title: string;
  label: Task['label'];
};
type UpdateTaskPayload = { id: string; title: string };

type TasksState = {
  tasks: Task[];
  filter: Filter;
  sorter: Sorter;
};
const initialState: TasksState = {
  tasks: getTasksFromStorage(),
  filter: 'all',
  sorter: 'newest',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<AddTaskPayload>) {
      const { title, label } = action.payload;
      if (!title) return;
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        label,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    deleteTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      //? find() returns a reference to the task object in the state array
      const task = state.tasks.find((el) => el.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTask(state, action: PayloadAction<UpdateTaskPayload>) {
      const { id, title } = action.payload;
      const task = state.tasks.find((el) => el.id === id);
      if (task) {
        task.title = title;
      }
    },
    setFilter(state, action: PayloadAction<Filter>) {
      const currentFilter = action.payload;
      state.filter = currentFilter;
    },
    setSorter(state, action: PayloadAction<Sorter>) {
      const sorter = action.payload;
      state.sorter = sorter;
    },
  },
});

export default tasksSlice.reducer;
export const {
  addTask,
  deleteTask,
  setFilter,
  setSorter,
  toggleTask,
  updateTask,
} = tasksSlice.actions;
