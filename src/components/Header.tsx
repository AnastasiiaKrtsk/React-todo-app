import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Menu from '../assets/icons/menu.svg';
import { Button } from '../ui/Button';
export const Header = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Button className="px-0 py-0 bg-transparent">
          <img className="w-10" src={Menu} alt="" />
        </Button>
        <h2 className="text-2xl">NEBULA</h2>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl">Today</h2>
          <p>Focus on what metters</p>
        </div>
        <div className="text-end">
          <span>{now.format('MMMM D/YYYY').toUpperCase()}</span>
          <h2 className="text-3xl">{now.format('HH:mm')}</h2>
        </div>
      </div>
    </>
  );
};
