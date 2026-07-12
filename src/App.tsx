import { useEffect, useMemo, useState } from 'react';
import { EnterTaskPanel } from './components/EnterTaskPanel';
import { FiltersPanel } from './components/FiltersPanel';
import { Header } from './components/Header';
import { Section } from './ui/Section';
import { Tasks } from './components/Tasks';
import { SORTERS } from './constants/sorters';
import type { Sorter } from './constants/task';
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
  const [currentSorter, setCurrentSorter] = useState<Sorter>('newest');

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
      createdAt: new Date().toISOString(),
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
  const visibleTasks = useMemo(() => {
    return [...tasks]
      .filter(TASK_FILTERS[currentFilter].fn)
      .sort(SORTERS[currentSorter].fn);
  }, [tasks, currentFilter, currentSorter]);
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
        <FiltersPanel
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          currentSorter={currentSorter}
          setCurrentSorter={setCurrentSorter}
        />
      </Section>
      <Section>
        <Tasks
          tasks={visibleTasks}
          deleteTask={deleteTask}
          statusToggle={statusToggle}
        />
      </Section>
    </>
  );
}

export default App;
