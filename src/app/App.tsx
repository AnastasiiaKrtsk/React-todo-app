import { useEffect, useMemo, useState } from 'react';
import { EnterTaskPanel } from '../components/EnterTaskPanel';
import { FiltersPanel } from '../components/FiltersPanel';
import { Header } from '../components/Header';
import { Section } from '../ui/Section';
import { Tasks } from '../components/TasksList';
import { TASK_SORTERS } from '../utils/sorters';
import type { Task } from '../utils/tasks';
import { TASK_FILTERS } from '../utils/filters';
import { setTasksToStorage } from '../utils/storage';
import { Modal } from '../ui/Modal';
import { DeleteModal } from '../components/DeleteModal';
import { SideBar, type MenuId } from '../components/SideBar';
import Background from '../assets/images/bg.jpg';
import { Footer } from '../components/Footer';
import { useAppDispatch, useAppSelector } from '../redux/tasksHooks';
import { deleteTask } from '../redux/tasksSlice';
import { selectTasks } from '../redux/tasksSelectors';

function App() {
  const tasks = useAppSelector(selectTasks);
  const filter = useAppSelector((state) => state.tasks.filter);
  const sorter = useAppSelector((state) => state.tasks.sorter);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [currentPage] = useState<MenuId>('today');

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTasksToStorage(tasks);
  }, [tasks]);

  function startEditing(id: string) {
    setEditingId(id);
  }

  function stopEditing() {
    setEditingId(null);
  }

  function handleDelete() {
    if (!selectedTask) return;
    dispatch(deleteTask(selectedTask.id));
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
      .filter(TASK_FILTERS[filter].fn)
      .sort(TASK_SORTERS[sorter].fn);
  }, [tasks, filter, sorter]);

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
        className="grid min-h-screen md:grid-cols-[240px_1fr] lg:grid-cols-[360px_fr]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)),
          url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <SideBar className="hidden md:flex" page={currentPage} />

        <div className="flex min-h-screen flex-col ">
          <main className="flex-1 mt-3">
            <Section>
              <Header
                onOpen={() => {
                  setIsDropMenuOpen(true);
                }}
              />
            </Section>

            <Section>
              <EnterTaskPanel />
            </Section>

            <Section>
              <FiltersPanel />
            </Section>

            <Section>
              <Tasks
                tasks={visibleTasks}
                onDeleteClick={handleOpen}
                startEditing={startEditing}
                stopEditing={stopEditing}
                editingId={editingId}
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
