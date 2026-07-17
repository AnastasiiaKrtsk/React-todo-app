import { Panel } from '../ui/Panel';
import dayjs from 'dayjs';
import { Button } from '../ui/Button';
import DelSvg from '../assets/icons/del-bin-contrast.svg';
import EditIcon from '../assets/icons/edit.svg';
import { labelStyles, statusStyles } from '../utils/labels';
import type { Task } from '../utils/tasks';
import { useState } from 'react';

type TasksProps = {
  tasks: Task[];
  onStatusToggle: (id: string) => void;
  onDeleteClick: (task: Task) => void;
  startEditing: (id: string) => void;
  stopEditing: () => void;
  editingId: string | null;
  updateTask: (id: string, title: string) => void;
};

// 1. MAIN LIST CONTAINER
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
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onStatusToggle={onStatusToggle}
          onDeleteClick={onDeleteClick}
          startEditing={startEditing}
          stopEditing={stopEditing}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};

// 2. INDIVIDUAL TASK ITEM COMPONENT
type TaskItemProps = {
  task: Task;
  isEditing: boolean;
  onStatusToggle: (id: string) => void;
  onDeleteClick: (task: Task) => void;
  startEditing: (id: string) => void;
  stopEditing: () => void;
  updateTask: (id: string, title: string) => void;
};

const TaskItem = ({
  task,
  isEditing,
  onStatusToggle,
  onDeleteClick,
  startEditing,
  stopEditing,
  updateTask,
}: TaskItemProps) => {
  const [value, setValue] = useState(task.title);

  return (
    <Panel className="p-2 lg:p-4">
      <div className="grid grid-cols-[32px_1fr_100px_32px] items-center gap-4 w-full">
        <button
          onClick={() => onStatusToggle(task.id)}
          className={`h-7 w-7 rounded-full border-2 shrink-0 transition-colors ${statusStyles[task.label].border} ${task.completed ? statusStyles[task.label].bg : ''}`}
        />

        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center w-full min-w-0 gap-2">
            {isEditing ? (
              <input
                className="border border-white/20 bg-black/20 px-2 py-1 rounded text-base font-medium w-full focus:outline-none focus:border-indigo-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            ) : (
              <h3
                className={`truncate text-base lg:text-xl font-medium p-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.title}
              </h3>
            )}

            {isEditing ? (
              <div className="flex gap-1 shrink-0">
                <Button
                  className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-500"
                  onClick={() => {
                    if (value.trim().length === 0) return;
                    updateTask(task.id, value);
                    stopEditing();
                  }}
                >
                  Save
                </Button>
                <Button
                  className="px-3 py-1 text-sm bg-zinc-700 hover:bg-zinc-600"
                  onClick={stopEditing}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <button
                className="shrink-0 hover:opacity-80"
                onClick={() => startEditing(task.id)}
              >
                <img src={EditIcon} alt="Edit" width={18} />
              </button>
            )}
          </div>
          <span className="text-xs md:text-base lg:text-base text-gray-400 ml-1">
            {dayjs(task.createdAt).format('hh:mm A')}
          </span>
        </div>

        <div className="flex justify-center">
          <span
            className={`uppercase px-3 py-1 text-xs rounded border-2 font-semibold text-center w-24 truncate ${labelStyles[task.label].border} ${labelStyles[task.label].text} ${labelStyles[task.label].bg}`}
          >
            {task.label}
          </span>
        </div>

        <Button
          className="flex justify-end shrink-0 bg-transparent p-0 hover:opacity-80"
          onClick={() => onDeleteClick(task)}
        >
          <img src={DelSvg} alt="Delete" width={24} />
        </Button>
      </div>
    </Panel>
  );
};
