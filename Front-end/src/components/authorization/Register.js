import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import google from './../../assets/icons/SocialGl.svg';
import { userRegisterApi } from '../../constants';
import Api from '../../api/Api';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SocialMediaButton from './SocialMediaButton';

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const onChangeName = e => {
    setName(e.target.value);
  };
  const handleLogo = () => {
    history.push('/');
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePhone = e => {
    setPhone(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    let user = {
      name: name,
      email: email,
      phone: phone,
      password: password
    };
    //make api call
    Api.post(`${process.env.REACT_APP_BASE_URL}${userRegisterApi}`, user)
      .then(result => {
        if (result.code === 200) {
          toast.success('You are successfully registered');
          setTimeout(function () {
            history.push('/login');
          }, 2000);
        } else {
          toast.error(result.message);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Network Error');
      });
  };
  const onSuccess = response => {
    console.log(response);
    // const data = {
    //   google_id: response.profileObj.googleId,
    //   email: response.profileObj.email,
    //   first_name: response.profileObj.name,
    // };
    // Api.post(`${process.env.REACT_APP_BASE_URL}${gloginUrl}`, data).then(
    //   result => {
    //     if (result?.meta?.code === 200) {
    //       if (props.isLoginPopup) {
    //         userDispatch({ type: 'SET_USER', payload: result });
    //         props.handleClose()
    //         window.onbeforeunload = null;
    //         window.location.reload();
    //         localStorage.removeItem('redirectUrl');
    //       } else {
    //         userDispatch({ type: 'SET_USER', payload: result });
    //         history.push('/');
    //       }
    //     } else {
    //       notify(result.meta.message);
    //     }
    //   },
    // );
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
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={onChangeName}
              required
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div className='form-group'>
            <label>Phone</label>
            <input
              type='tel'
              className='form-control'
              value={phone}
              onChange={onChangePhone}
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
            onClick={props.onRegister}
          >
            Register
          </button>
        </form>
        <GoogleLogin
          clientId={
            '599234116618-ch6jv068sl32ne3tkm217ohpvaarous4.apps.googleusercontent.com'
          }
          onSuccess={onSuccess}
          onFailure={onSuccess}
          cookiePolicy={'single_host_origin'}
          // render={renderProps => (
          //   <SocialMediaButton
          //     buttonClassName={'parentClassBtn textred'}
          //     imagePath={google}
          //     spanClassName=''
          //     buttonName='Google'
          //     onClick={renderProps.onClick}
          //   />
          // )}
        />
      </div>
    </>
  );
}
