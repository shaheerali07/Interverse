import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../../userContext/UserContext';
import List from '../usersList/list';
import NavBar from './navbar';
import Api from '../../api/Api';
import { getAllUsersApi } from '../../constants';
import RightBar from './rightBar';
import Feed from '../feed/feed';
export default function Welcome(props) {
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [invitationDetails, setInvitationDetails] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isInvited, setIsInvited] = useState(false);
  const [state, userDispatch] = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    let data = localStorage.getItem('userData');
    if (data.length) {
      Api.get(`${process.env.REACT_APP_BASE_URL}${getAllUsersApi}`)
        .then(res => {
          setAllUsers(res.data);
        })
        .catch(err => console.log(err));
      setUser(JSON.parse(data));
      userDispatch({ type: 'SET_USER', payload: JSON.parse(data) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    props.socket.on('InviteNotification', data => {
      handleNotification(data);
    });
  });
  const handleNotification = data => {
    setIsInvited(true);
    setInvitationDetails(data);
  };
  const handleLogOut = async () => {
    await userDispatch({ type: 'LOGOUT' });
    history.push('/login');
  };
  const handleSelectedUser = (e, user) => {
    setSelectedUser(user);
    userDispatch({ type: 'SET_INVITED_USER', payload: user });
  };
  return (
    <>
      <NavBar
        user={user}
        handleLogOut={handleLogOut}
        isInvited={isInvited}
        setIsInvited={setIsInvited}
        invitationDetails={invitationDetails}
        allUsers={allUsers}
      />
      <Container fluid className='mainContent'>
        <Row className='mainContentRow'>
          <Col xs lg='8' className='d-flex justify-content-center'>
            <Feed />
          </Col>
          <Col xs lg='4'>
            <List
              handleSelectedUser={handleSelectedUser}
              socket={props.socket}
              selectedUser={selectedUser}
              user={user}
              allUsers={allUsers}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
