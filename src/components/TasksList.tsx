import type { Task } from '../utils/tasks';
import { TaskItem } from './TaskItem';

type TasksProps = {
  tasks: Task[];
  onDeleteClick: (task: Task) => void;
  startEditing: (id: string) => void;
  stopEditing: () => void;
  editingId: string | null;
};

export const Tasks = ({
  tasks,
  onDeleteClick,
  startEditing,
  stopEditing,
  editingId,
}: TasksProps) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onDeleteClick={onDeleteClick}
          startEditing={startEditing}
          stopEditing={stopEditing}
        />
      ))}
    </div>
  );
};
