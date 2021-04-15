import React from 'react';
import './SignUp.scss';
import { Button, TextField, Input } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../../context'
require('dotenv').config();

const SignUp = (props) => {
	const [name, setName] = React.useState('');	
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
	const [photo, setPhoto] = React.useState('');
	const [photoPreview, setPhotoPreview] = React.useState(null)
	const { setAuth } = React.useContext(Context)

  const submitSignUp = React.useCallback(async (e) => {
    e.preventDefault();
		console.log(photo)
		axios({
			method: "POST",
			url: /* process.env.BACKEND_BASE_URL */ "https://sashan.herokuapp.com/users",
			data: {
				name,
				email,
				password: "" + password,
			}
		}).then((response) => {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem('userID',response.data.id)
			// document.cookie = `rslangToken=${response.data.token}; expires=${date}`
			props.history.push('/sign-in')
		})
  });

	const handlePhotoChange = (e) => {
		let file = e.target.files[0]
		let reader = new FileReader();
		reader.onloadend = () => {
			setPhoto(file)
			setPhotoPreview(reader.result)
		}
		if(file !== undefined){
			reader.readAsDataURL(file)
		}
	}

	const previewComponent = () => {
		if(photoPreview !== null){
			return <img alt="nothing" src={photoPreview} width="100px" height="100px" />
		} else {
			return <div>Please select an Image for Preview</div>
		}
		
	}

  return (
    <div className="auth">
      <div className="auth__container container">
        <div className="auth__content">
          <h2>
            Начнем наше путешествие с
            <span className="yellow-span"> RSlang!</span>
          </h2>
        </div>
        <div className="auth__card form">
          <h3 className="form__title">Регистрация</h3>
          <form className="form__container" onSubmit={submitSignUp}>
		  			<TextField
              type="name"
              label="Name"
              className="form__input"
              error={true}
              onChange={(e) => {
								setName(e.target.value)
							}}
							required
            />
            <TextField
              type="email"
              label="Email"
              className="form__input"
              error={true}
              onChange={(e) => setEmail(e.target.value)}
							required
            />
            <TextField
              type="password"
              label="Пароль"
              className="form__input"
              error={true}
              onChange={(e) => setPassword(e.target.value)}
							required
            />
            <TextField
              type="password"
              label="Повторите пароль"
              className="form__input"
              error={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
							required
            />
						<Input
						required
            type="file" 
            onChange={(e)=> handlePhotoChange(e)} />
						{previewComponent()}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="form__btn"
            >
              Регистарация
            </Button>
          </form>
          <p className="form__subheading">
            Уже есть аккаунт?
            <Link to="/sign-in" className="form__link">
              {' '}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
