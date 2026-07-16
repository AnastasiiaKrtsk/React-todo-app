import { Panel } from '../ui/Panel';
import type { Task } from '../utils/tasks';
import { TaskCardMobile } from './TaskCardMobile';
import { TaskRowDesktop } from './TaskRowDesktop';

type TasksProps = {
  tasks: Task[];
  onStatusToggle: (id: string) => void;
  onDeleteClick: (task: Task) => void;
  startEditing: (id: string) => void;
  stopEditing: () => void;
  editingId: string | null;
  updateTask: (id: string, title: string) => void;
};

export const Tasks = ({
  tasks,
  onStatusToggle,
  onDeleteClick,
  startEditing,
  stopEditing,
  editingId,
  updateTask,
}: TasksProps) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <Panel key={task.id} className="px-4">
          <TaskCardMobile
            task={task}
            onStatusToggle={onStatusToggle}
            onDeleteClick={onDeleteClick}
            startEditing={startEditing}
            stopEditing={stopEditing}
            editingId={editingId}
            updateTask={updateTask}
          />

          <TaskRowDesktop
            task={task}
            onStatusToggle={onStatusToggle}
            onDeleteClick={onDeleteClick}
          />
        </Panel>
      ))}
    </div>
  );
};
