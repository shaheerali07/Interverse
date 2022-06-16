import React, { useContext, useState } from 'react';
import ParticlesBg from 'particles-bg';
import logo from '../../assets/logo.png';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userLoginApi } from '../../constants';
import Api from '../../api/Api';
import UserContext from '../../userContext/UserContext';

export default function Login(props) {
  const [, userDispatch] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleLogo = () => {
    history.push('/');
  };
  const onSubmit = e => {
    e.preventDefault();
    if (email && password) {
      const user = {
        email: email,
        password: password
      };
      //make api call
      Api.post(`${process.env.REACT_APP_BASE_URL}${userLoginApi}`, user)
        .then(result => {
          if (result.code === 200) {
            toast.success('You are successfully logged In.');
            userDispatch({ type: 'SET_USER', payload: result.data });
            setTimeout(function () {
              history.push('/welcome');
            }, 2000);
          } else {
            toast.error(result.message);
          }
        })
        .catch(err => {
          console.log(err);
          toast.error('Network Error');
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='loginFormDiv'>
        <ParticlesBg type='square' bg={true} num={20} />
        <div className='mainContent'>
          <img
            src={logo}
            alt='web logo'
            style={{ height: '150px' }}
            onClick={handleLogo}
          />
        </div>
        <form className='loginForm' onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='text'
              className='form-control'
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary btn-block'
            onClick={props.onLogin}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
