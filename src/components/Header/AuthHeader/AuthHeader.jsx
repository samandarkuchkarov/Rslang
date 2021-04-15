import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthHeader.scss';

import Logo from '../../../assets/img/logo.png';

const AuthHeader = () => {
  const location = useLocation().pathname;
  const [isSignUp, setIsSignUp] = React.useState(false);

  React.useEffect(() => {
    if (location.includes('sign-up')) {
      setIsSignUp(true);
    } else {
      setIsSignUp(false)
    }
  }, [isSignUp, location]);

  return (
    <div className="auth-header">
      <div className="auth-header__container container">
        <div className="auth-header__logo">
          <img src={Logo} alt="" />
        </div>
        <div className="auth-header__buttons">
          {isSignUp
            ? <Link to="/sign-in" className="auth-header__button">Войти</Link>
            : <Link to="/sign-up" className="auth-header__button">Регистрация</Link>}
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
