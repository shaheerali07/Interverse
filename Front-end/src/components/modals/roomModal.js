import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../userContext/UserContext';

export default function RoomModal(props) {
  const [userState, userDispatch] = useContext(UserContext);
  const [username, setusername] = useState('');
  let history = useHistory();
  console.log(props);
  const handleSubmit = () => {
    let room = props.roomname;
    let userId = props.selectedUser._id;
    let senderId = props.user.userId;
    props.socket.emit('notification', { userId, senderId, room }); //selected user inviteduser room
    history.push(`/chat/${room}/${userState.user.name}`);
  };
  return (
    <>
      <Modal show={props.isRoomModalOpen} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter room name'
                value={props.roomname}
                onChange={e => props.setroomname(e.target.value)}
              />
              <Form.Text className='text-muted'>
                Kindly create room to start chat
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
