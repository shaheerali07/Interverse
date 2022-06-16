import React, { useContext, useEffect, useState } from 'react';
import { Badge, Card, ListGroup } from 'react-bootstrap';
import UserContext from '../../userContext/UserContext';
import RoomModal from '../modals/roomModal';

export default function List(props) {
  const [roomname, setroomname] = useState('');
  const [isRoomModalOpen, setRoomModalOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (props.user.userId) {
      props.socket.emit('addUser', props.user.userId);
      props.socket.on('getUsers', users => {
        let temp = props.allUsers
          .filter(f => users.some(u => u.userId === f._id))
          .filter(el => el._id !== props.user.userId);
        setOnlineUsers(temp);
      });
    }
  }, [props]);

  const handleUserClick = (e, user) => {
    props.handleSelectedUser(e, user);
    setRoomModalOpen(true);
  };
  const handleModalClose = () => {
    setRoomModalOpen(false);
  };
  return (
    <>
      <RoomModal
        isRoomModalOpen={isRoomModalOpen}
        handleClose={handleModalClose}
        setroomname={setroomname}
        roomname={roomname}
        socket={props.socket}
        selectedUser={props.selectedUser}
        user={props.user}
      />
      <h1>Online Users</h1>
      <ListGroup>
        {onlineUsers.map((el, index) => (
          <ListGroup.Item
            key={index}
            as='li'
            className='d-flex justify-content-between align-items-start listItem'
            onClick={e => handleUserClick(e, el)}
          >
            <div className='ms-2 me-auto'>
              <div className='bold'>{el.name}</div>
            </div>
            <i className='fa fa-circle' style={{ color: 'green' }}></i>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
