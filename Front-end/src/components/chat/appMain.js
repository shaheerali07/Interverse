import React, { useContext, useEffect, useState } from 'react';
import Api from '../../api/Api';
import { getAllUsersApi } from '../../constants';
import UserContext from '../../userContext/UserContext';
import Chat from './chat';

export default function Appmain(props) {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [state, userDispatch] = useContext(UserContext);

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
  return (
    <React.Fragment>
      <div className='right'>
        <Chat
          username={props.match.params.username}
          room={props.match.params.roomname}
          socket={props.socket}
          state={state}
        />
      </div>
    </React.Fragment>
  );
}
