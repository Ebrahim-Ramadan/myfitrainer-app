'use client'
import React, { useState, useEffect } from 'react';
import Entry from '@/components/progress/high-level';
import secureLocalStorage from 'react-secure-storage';
import Login from '@/components/login/login';

const Page = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = secureLocalStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      setLoggedIn(true);
    }
  }, []); 
  return (
    <>
      {loggedIn ? <Entry /> : <Login />}
    </>
  );
};

export default Page;
