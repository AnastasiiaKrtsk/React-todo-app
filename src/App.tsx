// import { Advice } from './components/Advice';
import { useEffect, useState } from 'react';
import { EnterTaskPanel } from './components/EnterTaskPanel';
import { FiltersPanel } from './components/FiltersPanel';
import { Header } from './components/Header';
import { Section } from './ui/Section';
import { Tasks } from './components/Tasks';
import dayjs from 'dayjs';
import { TASK_FILTERS } from './constants/filters';

export type Label = 'work' | 'health' | 'personal' | 'other';
export type Filter = 'all' | 'work' | 'health' | 'personal' | 'completed';

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
const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  });
  const [currentFilter, setCurrentFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask({ title, label }: AddTaskData) {
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
  const filteredTasks = tasks.filter(TASK_FILTERS[currentFilter].fn);
  return (
    <>
      <Section>
        <Header />
      </Section>

      <Section>
        <EnterTaskPanel addTask={addTask} />
      </Section>

      <Section>
        <FiltersPanel
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      </Section>

      <Section>
        <Tasks
          tasks={filteredTasks}
          deleteTask={deleteTask}
          statusToggle={statusToggle}
        />
      </Section>
    </>
  );
}

export default App;
