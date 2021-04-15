import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Context } from '../../../context'

const SignIn = (props) => {
	const { setAuth } = React.useContext(Context)
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState('');
	// let date = new Date(Date.now() + 86400e3);
	// date = date.toUTCString();
  const submitSignIn = React.useCallback(async (e) => {
    e.preventDefault();
		axios({
			method: "POST",
			url: "https://sashan.herokuapp.com/signin",
			data: {
				email,
				password: "" + password
			}
		}).then((response) => {
      localStorage.setItem("token", response.data.token)
		  console.log(response)
      localStorage.setItem('userID',response.data.userId)
			setAuth(true)
			props.history.push("/learning")
		})
  });

  return (
    <div className="auth">
      <div className="auth__container container">
        <div className="auth__content">
          <h2>
            <span className="yellow-span">Мы скучали по тебе, </span>
            ты готов продолжить обучение?
          </h2>
        </div>
        <div className="auth__card form">
          <h3 className="form__title">Регистрация</h3>
          <form className="form__container" onSubmit={submitSignIn}>
            <TextField
              type="input"
              label="Email"
              className="form__input"
              error={true}
              onBlur={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Пароль"
              className="form__input"
              error={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="form__btn"
            >
              Войти
            </Button>
          </form>
          <p className="form__subheading">
            Нет аккаунта?
            <Link to="/sign-up" className="form__link">
              {' '}
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
