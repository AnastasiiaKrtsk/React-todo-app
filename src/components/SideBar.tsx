import { Button } from '../ui/Button';
import MenuIcon from '../assets/icons/menu.svg';
import LogoIcon from '../assets/images/logo.svg';
import HomeIcon from '../assets/icons/home.svg';
import UpcomingIcon from '../assets/icons/upcomming.svg';
import ProjectsIcon from '../assets/icons/projects.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import StatsIcon from '../assets/icons/stats.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import { twMerge } from 'tailwind-merge';

type SideBarProps = {
  onClose?: () => void;
  className?: string;
};

type MenuId =
  | 'home'
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
    id: 'home',
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

export const SideBar = ({ onClose, className }: SideBarProps) => {
  return (
    <div
      className={twMerge(
        'overflow-y-auto scrollbar-hide w-full h-full bg-panel p-4 md:max-w-lg',
        className,
      )}
    >
      <Button className="px-0 py-0 bg-transparent md:hidden" onClick={onClose}>
        <img className="w-10" src={MenuIcon} alt="" />
      </Button>

      <div className="flex flex-col items-center gap-3 mb-7">
        <div>
          <img src={LogoIcon} alt="logo" />
        </div>
        <div className="text-center">
          <h2 className="uppercase">nebula</h2>
          <p className="uppercase">tasks system</p>
        </div>
      </div>

      <div>
        <ul className="flex flex-col gap-6 justify-center">
          {menuItems.map((tag) => (
            <li key={tag.id}>
              <div className="grid grid-cols-[50px_1fr] items-center gap-5 border border-button px-5 py-3 rounded">
                <img src={tag.icon} alt={tag.id} className="w-14 md:w-8" />
                <p className="text-3xl uppercase md:text-xl">{tag.id}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
