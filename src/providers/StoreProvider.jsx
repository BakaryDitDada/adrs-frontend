'use client';

import React from 'react';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from '../store';

const StoreProvider = ({children}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <Provider store={store}>
      {children}
      {isMounted && <Toaster richColors />}
    </Provider>
  )
}

export default StoreProvider