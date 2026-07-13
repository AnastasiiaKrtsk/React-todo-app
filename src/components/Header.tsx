import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

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
