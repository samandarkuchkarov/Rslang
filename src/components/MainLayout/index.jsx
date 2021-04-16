import React from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context';
import AuthHeader from '../Header/AuthHeader/AuthHeader';
import MainHeader from '../Header/MainHeader/MainHeader';
import Sidebar from '../Header/Sidebar/Sidebar';
import PropTypes from 'prop-types';

export default function MainLayout({ children }) {
  const location = useLocation();
  let { isAuth } = React.useContext(Context); // '' - you can see header when user loggined
  if(isAuth==='false'){
    isAuth=false
  }
  return (
    <>
      <header>
        {isAuth ? <MainHeader /> : <AuthHeader />}
      </header>
      { isAuth ? <Sidebar /> : <></>}
      <main className="body">
        {children}
      </main>
      <footer>
        Footer
      </footer>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
