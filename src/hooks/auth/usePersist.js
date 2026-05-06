import { useState, useEffect } from 'react';

const usePersist = () => {
    const [persist, setPersist] = useState(
      JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('persist') || false : false)
    );

    useEffect(() => {
      if(typeof window !== undefined) {
        localStorage.setItem('persist', JSON.stringify(persist));
      }
    }, [persist])

    return [persist, setPersist]
    
}

export default usePersist;