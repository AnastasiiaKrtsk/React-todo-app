import { useEffect, useMemo, useState } from 'react';
import { EnterTaskPanel } from './components/EnterTaskPanel';
import { FiltersPanel } from './components/FiltersPanel';
import { Header } from './components/Header';
import { Section } from './ui/Section';
import { Tasks } from './components/Tasks';
import { TASK_SORTERS } from './utils/sorters';
import type { AddTaskData, Filter, Label, Sorter, Task } from './utils/tasks';
import { TASK_FILTERS } from './utils/filters';
import { getTasksFromStorage, setTasksToStorage } from './utils/storage';
import { Modal } from './ui/Modal';
import { DeleteModal } from './components/DeleteModal';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => getTasksFromStorage());
  const [currentFilter, setCurrentFilter] = useState<Filter>('all');
  const [currentSorter, setCurrentSorter] = useState<Sorter>('newest');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    setTasksToStorage(tasks);
  }, [tasks]);

  function handleAddTask({ title, label }: AddTaskData) {
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

  function handleStatusToggle(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    if (!id) return;
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  function handleDelete() {
    if (!selectedTask) return;
    deleteTask(selectedTask.id);
    handleClose();
  }

  function handleOpen(task: Task) {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  }
  function handleClose() {
    setSelectedTask(null);
    setIsDeleteModalOpen(false);
  }

  const visibleTasks = useMemo(() => {
    return [...tasks]
      .filter(TASK_FILTERS[currentFilter].fn)
      .sort(TASK_SORTERS[currentSorter].fn);
  }, [tasks, currentFilter, currentSorter]);

  return (
    <>
      {isDeleteModalOpen && (
        <Modal>
          <DeleteModal onClose={handleClose} onDelete={handleDelete} />
        </Modal>
      )}
      <Section>
        <Header />
      </Section>

      {/* <Section>
        <Advice />
      </Section> */}

      <Section>
        <EnterTaskPanel onAddTask={handleAddTask} />
      </Section>
      <Section>
        <FiltersPanel
          filter={currentFilter}
          onFilterChange={setCurrentFilter}
          sorter={currentSorter}
          onSorterChange={setCurrentSorter}
        />
      </Section>
      <Section>
        <Tasks
          tasks={visibleTasks}
          onStatusToggle={handleStatusToggle}
          onDeleteClick={handleOpen}
        />
      </Section>
    </>
  );
}

export default App;
