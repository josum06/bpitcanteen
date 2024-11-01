import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='flex-grow'>
            <Outlet />
        </main>
        <Footer/>
    </div>
  );
};

export default AppLayout;
