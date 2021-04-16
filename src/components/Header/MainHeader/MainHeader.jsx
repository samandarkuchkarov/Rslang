import React from 'react';
import './MainHeader.scss';

import SettingsIcon from '../../../assets/img/icons/settings.png';
import { ReactComponent as LogoutIcon } from '../../../assets/img/icons/logout.svg';
import { Link,useHistory } from 'react-router-dom';

const MainHeader = () => {
  const history = useHistory();
  const logout = () =>{
    localStorage.setItem('isAuth',false)
    history.go(0)
  }
  return (
    <div className="main-header">
      <div className="main-header__container">
        <div className="main-header__title">
            <h2>Изучение</h2>
        </div>
        <div className="main-header__settings">
            <Link to="/settings" className="setting-icon">
            <img src={SettingsIcon} alt="" />
            </Link>
            <p className="main-header__settings-mail">{localStorage.getItem('name')}</p>
            <div className="main-header__logout">
              <LogoutIcon onClick={logout} className="logout-icon" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
