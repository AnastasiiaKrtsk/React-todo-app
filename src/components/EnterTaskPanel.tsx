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
    <Panel>
      <div className="flex">
        <input
          className="w-full focus:outline-0"
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
            className="bg-panel hover:cursor-pointer hover:bg-ghost rounded p-1"
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
          className="py-3 px-5 -mr-2 -my-1 md:-mr-5"
          onClick={() => {
            onAddTask({ title: value, label: label });
            setValue('');
            setLabel('other');
          }}
        >
          <img src={AddBtn} alt="addBtn" />
        </Button>
      </div>
    </Panel>
  );
};
