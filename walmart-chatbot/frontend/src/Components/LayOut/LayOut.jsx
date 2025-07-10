import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

function LayOut() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayOut;
