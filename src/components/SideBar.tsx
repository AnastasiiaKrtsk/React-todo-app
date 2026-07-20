import MenuIcon from '../assets/icons/menu.svg';
import LogoIcon from '../assets/images/logo.svg';
import HomeIcon from '../assets/icons/home-indigo.svg';
import UpcomingIcon from '../assets/icons/upcomming-indigo.svg';
import ProjectsIcon from '../assets/icons/projects-indigo.svg';
import CalendarIcon from '../assets/icons/calendar-indigo.svg';
import StatsIcon from '../assets/icons/stats-indigo.svg';
import SettingsIcon from '../assets/icons/settings-indigo.svg';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/Button';

type SideBarProps = {
  onClose?: () => void;
  className?: string;
  page: MenuId;
};

export type MenuId =
  | 'today'
  | 'upcoming'
  | 'projects'
  | 'calendar'
  | 'stats'
  | 'settings';

type Tag = {
  id: MenuId;
  icon: string;
  path: string;
};

const menuItems: Tag[] = [
  {
    id: 'today',
    icon: HomeIcon,
    path: '/',
  },
  {
    id: 'upcoming',
    icon: UpcomingIcon,
    path: '/upcoming',
  },
  {
    id: 'projects',
    icon: ProjectsIcon,
    path: '/projects',
  },
  {
    id: 'calendar',
    icon: CalendarIcon,
    path: '/calendar',
  },
  {
    id: 'stats',
    icon: StatsIcon,
    path: '/stats',
  },
  {
    id: 'settings',
    icon: SettingsIcon,
    path: '/settings',
  },
];

export const SideBar = ({ onClose, className, page }: SideBarProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col scrollbar-hide w-full h-full bg-panel p-4 overflow-y-auto md:overflow-y-hidden md:w-full lg:w-full ',
        className,
      )}
    >
      <Button className="px-0 py-0 bg-transparent md:hidden" onClick={onClose}>
        <img className="w-8" src={MenuIcon} alt="" />
      </Button>

      <div className="flex flex-col items-center gap-3 mb-7 mt-5">
        <div>
          <img src={LogoIcon} alt="logo" />
        </div>
        <div className="text-center">
          <h2 className="uppercase text-2xl text-indigo-500">nebula</h2>
          <p className="uppercase">tasks system</p>
        </div>
      </div>
      <div className="mb-15">
        <ul className="flex flex-col gap-5 justify-center md:ml-4">
          {menuItems.map((tag) => (
            <li key={tag.id}>
              <div
                className={`flex justify-center items-center md:justify-start gap-5 border px-5 py-3 md:px-10 md:rounded-l-2xl md:rounded-r-none md:-mr-4 md:border-r-0
                ${tag.id === page ? 'border-indigo-400/25' : 'border-none'} 
                ${tag.id === page ? 'bg-indigo-500/3' : 'bg-transparent'}`}
              >
                <img src={tag.icon} alt={tag.id} className="w-10 md:w-6" />
                <p className="text uppercase md:text-base">{tag.id}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
