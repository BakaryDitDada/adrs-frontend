import { useState, useEffect } from 'react';

const usePersist = () => {
  const [persist, setPersist] = useState(() => {
    if (typeof window !== 'undefined') {
        const localData = localStorage.getItem('persist');
        return localData ? JSON.parse(localData) : false;
    }
    return false;
  });

  useEffect(() => {
    if(typeof window !== 'undefined') {
      localStorage.setItem('persist', JSON.stringify(persist));
    }
  }, [persist])

  return [persist, setPersist]
}

export default usePersist;