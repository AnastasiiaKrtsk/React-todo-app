// import { Advice } from './components/Advice';
import { useEffect, useState } from 'react';
import { EnterTaskPanel } from './components/EnterTaskPanel';
import { FiltersPanel } from './components/FiltersPanel';
import { Header } from './components/Header';
import { Section } from './ui/Section';
import { Tasks } from './components/Tasks';
import dayjs from 'dayjs';

export type Label = 'work' | 'health' | 'personal' | 'other';
export type Task = {
  id: string;
  title: string;
  label: Label;
  completed: boolean;
  createdAt: string;
};
const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  type AddTaskProps = {
    title: string;
    label: Label;
  };

  function addTask({ title, label }: AddTaskProps) {
    if (!title) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      label,
      completed: false,
      createdAt: dayjs(new Date()).format('DD/MM HH:mm'),
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id: string) {
    if (!id) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function statusToggle(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <>
      <Section>
        <Header />
      </Section>

      {/* <Section>
        <Advice />
      </Section> */}

      <Section>
        <EnterTaskPanel addTask={addTask} />
      </Section>
      <Section>
        <FiltersPanel />
      </Section>
      <Section>
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          statusToggle={statusToggle}
        />
      </Section>
    </>
  );
}

export default App;
