import { useEffect, useMemo, useState } from 'react';
import { EnterTaskPanel } from './components/EnterTaskPanel';
import { FiltersPanel } from './components/FiltersPanel';
import { Header } from './components/Header';
import { Section } from './ui/Section';
import { Tasks } from './components/Tasks';
import { TASK_SORTERS } from './utils/sorters';
import type { AddTaskData, Filter, Sorter, Task } from './utils/tasks';
import { TASK_FILTERS } from './utils/filters';
import { getTasksFromStorage, setTasksToStorage } from './utils/storage';
import { Modal } from './ui/Modal';
import { DeleteModal } from './components/DeleteModal';
import { SideBar, type MenuId } from './components/SideBar';
import Background from './assets/images/bg.jpg';
import { Footer } from './components/Footer';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => getTasksFromStorage());
  const [currentFilter, setCurrentFilter] = useState<Filter>('all');
  const [currentSorter, setCurrentSorter] = useState<Sorter>('newest');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  const [currentPage] = useState<MenuId>('home');

  const [editingId, setEditingId] = useState<string | null>(null);

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
  //******************
  function updateTask(id: string, title: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task)),
    );
  }

  function startEditing(id: string) {
    setEditingId(id);
  }

  function stopEditing() {
    setEditingId(null);
  }
  //****************** */
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
    <div>
      {isDeleteModalOpen && (
        <Modal className="inset-1">
          <DeleteModal onClose={handleClose} onDelete={handleDelete} />
        </Modal>
      )}
      {isDropMenuOpen && (
        <Modal className="inset-0 md:hidden">
          <SideBar
            onClose={() => {
              setIsDropMenuOpen(false);
            }}
            page={currentPage}
          />
        </Modal>
      )}

      <div
        className="grid min-h-screen md:grid-cols-[280px_1fr] lg:grid-cols-[360px_1fr]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)),
          url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <SideBar className="hidden md:block" page={currentPage} />

        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            <Section>
              <Header
                onOpen={() => {
                  setIsDropMenuOpen(true);
                }}
              />
            </Section>

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
                startEditing={startEditing}
                stopEditing={stopEditing}
                editingId={editingId}
                updateTask={updateTask}
              />
            </Section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
