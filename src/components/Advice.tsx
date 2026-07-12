import { useEffect, useState } from 'react';
import { Panel } from '../ui/Panel';

export const Advice = () => {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const url = 'https://api.adviceslip.com/advice';

  useEffect(() => {
    async function fetchAdvice() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Faild fetch advice');
        const data = await res.json();
        setAdvice(data.slip.advice);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchAdvice();
  }, []);
  return (
    <>
      {loading && 'SET LOADING PAGE'}
      {error && 'SET ERROR PAGE'}
      <Panel>
        <p>{advice ? advice : 'Breathe'}</p>
      </Panel>
    </>
  );
};
