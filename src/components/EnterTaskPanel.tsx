import { useState } from 'react';
import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';
import AddBtn from '../assets/icons/add.svg';
import type { Label } from '../utils/tasks';

type EnterTaskPanelProps = {
  onAddTask: (task: { title: string; label: Label }) => void;
};
export const EnterTaskPanel = ({ onAddTask }: EnterTaskPanelProps) => {
  const [value, setValue] = useState('');
  const [label, setLabel] = useState<Label>('other');

  return (
    <Panel className="px-4 py-2 lg:px-3 lg:py-2">
      <div className="flex justify-center items-center">
        <input
          className="w-full focus:outline-0 text-lg"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue === '' || !newValue.startsWith(' ')) {
              setValue(newValue);
            }
          }}
          required
          type="text"
          placeholder="Enter task"
        />
        <div className="mr-3 ml-3">
          <select
            className="flex py-2 px-2  items-center focus:bg-indigo-950 hover:cursor-pointer hover:bg-ghost rounded  border border-violet-400/50 focus:border-violet-400/50 focus:outlone-0 bg-violet-600/10"
            name="label"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value as Label);
            }}
          >
            <option value="work">Work</option>
            <option value="health">Health</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Button
          className="py-3 px-6 md:py-3 md:px-6 lg:py-3"
          onClick={() => {
            onAddTask({ title: value, label: label });
            setValue('');
            setLabel('other');
          }}
        >
          <img src={AddBtn} alt="addBtn" className="w-5 md:w-7 lg:w-5" />
        </Button>
      </div>
    </Panel>
  );
};
