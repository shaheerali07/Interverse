import './chat.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import UserContext from '../../userContext/UserContext';
import { useHistory } from 'react-router-dom';

function Chat({ username, room, socket, state }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  let history = useHistory();
  useEffect(() => {
    let userId = state.user.userId;
    socket.emit('joinRoom', { userId, room, username });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket.on('message', data => {
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text
      });
      setMessages([...temp]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  useEffect(() => {
    return () => {
      let userId = state.user.userId;
      socket.emit('roomDisconect', { userId });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendData = () => {
    if (text !== '') {
      let userId = state.user.userId;
      socket.emit('chat', { text, userId });
      setText('');
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  const handleChatClose = () => {
    history.push('/welcome');
  };
  return (
    <div className='chat'>
      <div className='user-name'>
        <h2>
          <div
            className='d-flex justify-content-between'
            style={{ margin: '0' }}
          >
            <span style={{ margin: '0' }}>
              {username} <span style={{ fontSize: '0.7rem' }}>in {room}</span>
            </span>
            <span
              style={{ margin: '0', cursor: 'pointer' }}
              onClick={handleChatClose}
            >
              <i class='fas fa-times-circle'></i>
            </span>
          </div>
        </h2>
      </div>
      <div className='chat-message'>
        {messages.map(i => {
          if (i.username === username) {
            return (
              <div className='message'>
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className='message mess-right'>
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className='send'>
        <input
          placeholder='enter your message'
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
