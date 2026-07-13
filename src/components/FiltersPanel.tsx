import { Panel } from '../ui/Panel';

import { Button } from '../ui/Button';
import { TASK_FILTERS } from '../constants/filters';

import type { Filter } from '../App';

type FiltersPanelpProps = {
  currentFilter: Filter;
  setCurrentFilter: (filter: Filter) => void;
};

export const FiltersPanel = ({
  currentFilter,
  setCurrentFilter,
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
          className="flex items-center bg-panel hover:cursor-pointer hover:bg-ghost rounded p-1"
        >
          <option value="">Newest</option>
          <option value="">Oldest</option>
          <option value="">A-Z</option>
          <option value="">Z-A</option>
        </select>
      </div>
    </Panel>
  );
};
