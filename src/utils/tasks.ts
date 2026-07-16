export type Label = 'work' | 'health' | 'personal' | 'other';
export type Filter = 'all' | 'work' | 'health' | 'personal' | 'completed';
export type Sorter = 'newest' | 'oldest' | 'az' | 'za';

export type Task = {
  id: string;
  title: string;
  label: Label;
  completed: boolean;
  createdAt: string;
};
export type AddTaskData = {
  title: string;
  label: Label;
};
export type TaskItemProps = {
  className?: string;
  task: Task;
  onStatusToggle: (id: string) => void;
  onDeleteClick: (task: Task) => void;
  onEditClick: (task: Task) => void;
};
