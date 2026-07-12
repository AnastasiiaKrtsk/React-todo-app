import type { Task } from '../App';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import DelSvg from '../assets/icons/del-bin-contrast.svg';
import { labelStyles } from '../constants/labels';

type TasksProps = {
  tasks: Task[];
  deleteTask: (id: string) => void;
  statusToggle: (id: string) => void;
};

export const Tasks = ({ tasks, deleteTask, statusToggle }: TasksProps) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <Panel key={task.id}>
          <ul className="list-none">
            <li className="flex gap-3 items-center">
              <button
                onClick={() => {
                  console.log('Complete status:', task.completed);
                  statusToggle(task.id);
                }}
                className={`mt-1 h-5 w-5 rounded-full border-2 hover:cursor-pointer ${labelStyles[task.label].border} ${task.completed ? `${labelStyles[task.label].bg}` : 'bg-transparent'}`}
              />
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <h3 className="truncate font-medium">{task.title}</h3>
                  <span
                    className={`rounded border px-2 py-0.5 text-xs uppercase ${labelStyles[task.label].color} border-${labelStyles[task.label].border}`}
                  >
                    {task.label}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
                  <span>{task.createdAt} AM</span>
                </div>
              </div>
              <Button
                className="-mr-2 -my-1 md:-mr-3 lg:-mr-5 py-5 px-4 hover:bg-button-del "
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                <img src={DelSvg} alt="" width={18} height={18} />
              </Button>
            </li>
          </ul>
        </Panel>
      ))}
    </div>
  );
};
