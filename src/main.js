//main.js
import { render, renderTags } from './render';
import {
  addTaskAction,
  deleteTaskAction,
  setTaskActiveAction,
  setCurrentFilterAction,
  setSorting,
} from './state';
import { form, list, tagSelect, filters } from './dom';

function bootstrap() {
  render();
  renderTags();
}

bootstrap();

const formSubmitHandler = (e) => {
  e.preventDefault();

  const taskTitle = e.target.elements.title.value.trim();
  if (!taskTitle) return;

  const taskTag = tagSelect.value;

  const newTask = {
    id: Date.now(),
    title: taskTitle,
    tag: taskTag,
    completed: false,
    createdAt: Date.now(),
  };

  console.log('add!', Date.now());

  addTaskAction(newTask);
  form.reset();
  bootstrap();
};

const listClickHandler = (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.closest('[data-del]')) {
    console.log('del!', Date.now());

    deleteTaskAction(id);
    bootstrap();
  }

  const status = e.target.closest('.status');
  if (status) {
    setTaskActiveAction(id);
    bootstrap();
  }
};

const filtersClickHandler = (e) => {
  const filterBtn = e.target.closest('button');
  if (!filterBtn) return;

  const currentFilter = filterBtn.dataset.filter;
  setCurrentFilterAction(currentFilter);
  bootstrap();
};

const filtersChangeHandler = (e) => {
  const sortSelect = e.target.closest('#sort-select');
  if (!sortSelect) return;

  setSorting(sortSelect.value);
  bootstrap();
};

filters.addEventListener('change', filtersChangeHandler);
filters.addEventListener('click', filtersClickHandler);

form.addEventListener('submit', formSubmitHandler);
list.addEventListener('click', listClickHandler);
