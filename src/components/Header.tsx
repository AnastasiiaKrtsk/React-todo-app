import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MenuBtn from '../assets/icons/menu.svg';
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
      <div className="flex justify-between items-center">
        <div className="my-4 md:hidden">
          <img src={MenuBtn} alt="Menu" width={30} />
        </div>
        <h3 className="text-3xl">NEBULA</h3>
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
// so i need to use state so date could rerender ??? right? because i need time to change
