import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';
import type { Filter, Sorter } from '../utils/tasks';
import { TASK_SORTERS } from '../utils/sorters';
import { TASK_FILTERS } from '../utils/filters';

type FiltersPanelpProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  sorter: Sorter;
  onSorterChange: (sorter: Sorter) => void;
};

export const FiltersPanel = ({
  filter,
  onFilterChange,
  sorter,
  onSorterChange,
}: FiltersPanelpProps) => {
  return (
    <Panel>
      <div className="flex items-center">
        <ul className="flex justify-around gap-3 w-full items-center">
          {(
            Object.entries(TASK_FILTERS) as [
              Filter,
              (typeof TASK_FILTERS)[Filter],
            ][]
          ).map(([key, value]) => (
            <li key={key}>
              <div className="flex gap-1 rounded md:gap-3 p-1">
                <Button
                  className={`flex gap-2 hover:bg-button ${filter === key ? 'bg-button' : 'bg-transparent'}`}
                  onClick={() => {
                    onFilterChange(key as Filter);
                  }}
                >
                  <img
                    src={value.icon}
                    alt={value.name}
                    className="w-10 md:w-8"
                  />
                  <p className="hidden md:hidden lg:block">{value.name}</p>
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <select
          name="sort"
          value={sorter}
          className="flex items-center bg-panel hover:cursor-pointer hover:bg-ghost rounded p-1"
          onChange={(e) => {
            onSorterChange(e.target.value as Sorter);
          }}
        >
          {(
            Object.entries(TASK_SORTERS) as [
              Sorter,
              (typeof TASK_SORTERS)[Sorter],
            ][]
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
