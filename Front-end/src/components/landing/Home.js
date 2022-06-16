import React from 'react';
import { Button, Nav, NavItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import logo from '../../assets/logo.png';
import '../../App.css';

export default function Home() {
  const history = useHistory();
  const handleRegister = () => {
    history.push('/register');
  };
  const handleLogin = () => {
    history.push('/login');
  };
  const handleLogoClick = () => {
    history.push('/');
  };
  return (
    <>
      <ParticlesBg type='square' bg={true} num={20} />
      <div className='App container'>
        <Nav className='mainNav'>
          <div className='mainContent'>
            <img src={logo} alt='web logo' onClick={handleLogoClick} />
          </div>
          <div>
            <Button variant='info' className='registerButton'>
              <NavItem onClick={handleRegister}>Register</NavItem>
            </Button>
            <Button variant='info'>
              <NavItem onClick={handleLogin}>Login</NavItem>
            </Button>
          </div>
        </Nav>
      </div>
    </>
  );
}
