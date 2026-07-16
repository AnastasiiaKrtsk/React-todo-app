//render.js
import { list, tagSelect, filters, header } from './dom';
import { state } from './state';
import { TAGS, FILTERS, SORTERS } from './constants';
import dayjs from 'dayjs';

function getFilteredTasks() {
  const matchFilter = FILTERS[state.currentFilter];
  return state.tasks.filter((task) => matchFilter.fn(task));
}

function applySort(tasks) {
  const sorted = [...tasks];

  const sorter = SORTERS.find((s) => s.id === state.sort);
  if (!sorter) return sorted;

  return sorted.sort(sorter.fn);
}

export const render = () => {
  const filteredTasks = getFilteredTasks();
  const sorted = applySort(filteredTasks);

  list.innerHTML = renderTasks(sorted);

  renderFilters();
  renderSorters();
};

const renderTasks = (tasks) => {
  return tasks
    .map((task) => {
      const statusClass = task.completed ? 'done' : 'active';
      return `
    <li data-id=${task.id} data-tag=${task.tag} class="${statusClass}">
    <span class="status ${statusClass} ${task.tag}"></span>
    <span class="title ${statusClass} ${task.tag}">${task.title}</span>
    <span class="tag ${task.tag}">${task.tag.toUpperCase()}</span>
    <span class="time">${task.createdAt}</span>
    <button type="button" data-del>x</button>
    </li>
    `;
    })
    .join('');
};

export const renderTags = () => {
  tagSelect.innerHTML = TAGS.map((tag) => {
    return `
    <option value="${tag.id}">${tag.label}</option>
    `;
  });
};

const renderFilters = () => {
  const filtersHTML = Object.entries(FILTERS)
    .map(
      ([id, filter]) => `
      <button data-filter="${id}" class="filter-btn ${state.currentFilter === id ? 'active' : 'hidden'}">
        <img src="${filter.svg}" alt="" />
        <span>${filter.label}</span>
      </button>
    `,
    )
    .join('');

  const sortHTML = `
    <select name="sort" id="sort-select"></select>
  `;

  filters.innerHTML = filtersHTML + sortHTML;
};

const renderSorters = () => {
  const sorting = document.querySelector('#sort-select');
  sorting.innerHTML = SORTERS.map((sorter) => {
    return `
    <option value="${sorter.id}">${sorter.label}</option>
    `;
  });
  sorting.value = state.sort;
};

const renderHeader = () => {
  const date = dayjs().format('MMMM D, YYYY');
  const time = dayjs().format('HH:mm');

  header.innerHTML = `
    <p>${date}</p>
    <h1>${time}</h1>
   `;
};
renderHeader();
setInterval(renderHeader, 1000);
