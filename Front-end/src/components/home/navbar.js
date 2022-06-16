import React, { useEffect, useState } from 'react';
import {
  Navbar,
  FormControl,
  Nav,
  Dropdown,
  Button,
  Badge
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function NavBar(props) {
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [notiSender, setNotiSender] = useState({});

  useEffect(() => {
    if (props.invitationDetails.senderId) {
      console.log(props.invitationDetails);
      let temp = props.allUsers.filter(
        el => el._id === props.invitationDetails.senderId
      );
      setNotiSender(temp[0]);
    }
  }, [props.invitationDetails]);
  const handleNotiClick = () => {
    props.setIsInvited(false);
    setIsNotiOpen(!isNotiOpen);
  };
  return (
    <Navbar fixed='top' className='navbar'>
      <Navbar.Brand>
        {' '}
        <img
          alt=''
          src={logo}
          width='30'
          height='30'
          className='d-inline-block align-top'
        />{' '}
        Home
      </Navbar.Brand>
      <FormControl
        type='search'
        placeholder='Search'
        className='me-2 navSearch'
        aria-label='Search'
      />
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link>
            <i
              className='fas fa-bell fa-2x'
              style={{ color: props.isInvited ? 'red' : 'rgba(0,0,0,.5)' }}
              onClick={handleNotiClick}
            ></i>
          </Nav.Link>
          {isNotiOpen && (
            <div className='notiDiv'>
              <span>
                {props.invitationDetails.message} from {notiSender.name}.<br />
                Click{' '}
                <Link
                  to={`/chat/${props.invitationDetails.room}/${props.user.name}`}
                >
                  here
                </Link>{' '}
                to enter chat room.
              </span>
            </div>
          )}
          <Dropdown>
            <Dropdown.Toggle variant='Secondary' id='dropdown-basic'>
              <i className='fas fa-user-circle fa-2x'></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdownMenu'>
              <Dropdown.Item href='#'>Profile</Dropdown.Item>
              <Dropdown.Item href='#' onClick={props.handleLogOut}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
