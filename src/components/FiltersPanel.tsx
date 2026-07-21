import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';
import type { Filter, Sorter } from '../utils/tasks';
import { TASK_SORTERS } from '../utils/sorters';
import { TASK_FILTERS } from '../utils/filters';
import { useAppDispatch, useAppSelector } from '../redux/tasksHooks';
import { setFilter, setSorter } from '../redux/tasksSlice';
import { selectFilter, selectSorter } from '../redux/tasksSelectors';

export const FiltersPanel = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const sorter = useAppSelector(selectSorter);

  return (
    <Panel className="lg:px-3 py-3">
      <div className="flex items-center gap-5">
        <ul className="grid grid-flow-col auto-cols-fr gap-1 md:gap-5 lg:gap-10 w-full items-center">
          {(
            Object.entries(TASK_FILTERS) as [
              Filter,
              (typeof TASK_FILTERS)[Filter],
            ][]
          ).map(([key, value]) => (
            <li key={key} className="w-full">
              <Button
                className={`px-0 py-0 flex items-center justify-center w-full h-12 gap-2 hover:bg-button ${
                  filter === key ? 'bg-button' : 'bg-transparent'
                }`}
                onClick={() => {
                  dispatch(setFilter(key));
                }}
              >
                <img
                  src={value.icon}
                  alt={value.name}
                  className="w-7 h-7 object-contain shrink-0 md:w-6 md:h-6"
                />
                <p className="hidden lg:block ">{value.name}</p>
              </Button>
            </li>
          ))}
        </ul>

        <select
          name="sort"
          value={sorter}
          className="flex p-2 items-center focus:bg-indigo-950 hover:cursor-pointer hover:bg-ghost rounded  border border-violet-400/50 focus:border-violet-400/50 focus:outlone-0 bg-violet-600/10"
          onChange={(e) => {
            const value = e.target.value;
            dispatch(setSorter(value as Sorter));
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
