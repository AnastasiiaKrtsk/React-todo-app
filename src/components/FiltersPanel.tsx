import { Panel } from '../ui/Panel';

import { Button } from '../ui/Button';
import type { Filter, Sorter } from '../constants/task';
import { SORTERS } from '../constants/sorters';
import { TASK_FILTERS } from '../constants/filters';

type FiltersPanelpProps = {
  currentFilter: Filter;
  setCurrentFilter: (filter: Filter) => void;
  currentSorter: Sorter;
  setCurrentSorter: (sorter: Sorter) => void;
};

export const FiltersPanel = ({
  currentFilter,
  setCurrentFilter,
  currentSorter,
  setCurrentSorter,
}: FiltersPanelpProps) => {
  return (
    <Panel>
      <div className="flex items-center">
        <ul className="flex justify-around w-full items-center">
          {(
            Object.entries(TASK_FILTERS) as [
              Filter,
              (typeof TASK_FILTERS)[Filter],
            ][]
          ).map(([key, value]) => (
            <li key={key}>
              <div className="flex gap-1 md:gap-3 rounded ">
                <Button
                  className={`p-5 hover:bg-button ${currentFilter === key ? 'bg-button' : 'bg-transparent'}`}
                  onClick={() => {
                    setCurrentFilter(key as Filter);
                  }}
                >
                  <img src={value.icon} alt={value.name} width={25} />
                  <p className="hidden md:flex">{value.name}</p>
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <select
          name="sort"
          value={currentSorter}
          onChange={(e) => {
            setCurrentSorter(e.target.value as Sorter);
          }}
          className="flex items-center bg-panel hover:cursor-pointer hover:bg-ghost rounded p-1"
        >
          {(
            Object.entries(SORTERS) as [Sorter, (typeof SORTERS)[Sorter]][]
          ).map(([key, sorter]) => (
            <option key={key} value={key}>
              {sorter.label}
            </option>
          ))}
        </select>
      </div>
    </Panel>
  );
};
