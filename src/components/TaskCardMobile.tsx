import dayjs from 'dayjs';
import { Button } from '../ui/Button';
import DelSvg from '../assets/icons/del-bin-contrast.svg';
import EditIcon from '../assets/icons/edit.svg';
import { labelStyles, statusStyles } from '../utils/labels';
import type { Task } from '../utils/tasks';
import { useState } from 'react';

type Props = {
  task: Task;
  onStatusToggle: (id: string) => void;
  onDeleteClick: (task: Task) => void;
  startEditing: (id: string) => void;
  stopEditing: () => void;
  editingId: string | null;
  updateTask: (id: string, title: string) => void;
};

export const TaskCardMobile = ({
  task,
  onStatusToggle,
  onDeleteClick,
  startEditing,
  stopEditing,
  editingId,
  updateTask,
}: Props) => {
  const [value, setValue] = useState(task.title);
  const isEditing = editingId === task.id;

  return (
    <div className="md:hidden grid grid-cols-[32px_1fr_100px_32px] items-center gap-4 w-full">
      <button
        onClick={() => onStatusToggle(task.id)}
        className={`h-7 w-7 rounded-full border-2 shrink-0 ${statusStyles[task.label].border} ${task.completed ? statusStyles[task.label].bg : ''}`}
      />

      <div className="min-w-0 flex flex-col justify-center">
        <div className="flex items-center w-full min-w-0 gap-2">
          {isEditing ? (
            <input
              className="border"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          ) : (
            <h3 className="truncate text-base font-medium p-1">{task.title}</h3>
          )}

          {isEditing ? (
            <Button
              onClick={() => {
                if (value.length === 0) return;
                updateTask(task.id, value);
                stopEditing();
              }}
            >
              Save
            </Button>
          ) : (
            <button
              onClick={() => {
                startEditing(task.id);
              }}
            >
              <img src={EditIcon} alt="" />
            </button>
          )}
        </div>
        <span className="text-sm text-gray-400">
          {dayjs(task.createdAt).format('hh:mm A')}
        </span>
      </div>

      <div className="flex justify-center">
        <span
          className={`uppercase px-3 py-1 text-xs rounded border-2 font-semibold ${labelStyles[task.label].border} ${labelStyles[task.label].text} ${labelStyles[task.label].bg}`}
        >
          {task.label}
        </span>
      </div>

      <Button
        className="flex justify-end shrink-0 bg-transparent p-0"
        onClick={() => onDeleteClick(task)}
      >
        <img src={DelSvg} alt="Delete" width={24} />
      </Button>
    </div>
  );
};
