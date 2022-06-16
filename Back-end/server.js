const dbConfig = require('./config/index.js');
const bodyParser = require('body-parser');
const {
  get_Current_User,
  user_Disconnect,
  join_User,
  remove_user,
  getUserList
} = require('./dump/index');
const cors = require('cors');
const mongoose = require('mongoose');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(cors());
mongoose.Promise = global.Promise;
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes
require('./routes/user.routes')(app);
//database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

//initializing the socket io connection
let users = [];

const join_Room = (userId, room, username) => {
  let currUser = users.find(user => user.userId === userId);
  if (currUser) {
    currUser.room = room;
    currUser.username = username;
    users.forEach(el => {
      if (el.userId === userId) {
        el = currUser;
      }
    });
    return currUser;
  }
};

const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = socketId => {
  users = users.filter(user => user.socketId !== socketId);
};

const getUser = userId => {
  return users.find(user => user.userId === userId);
};

io.on('connection', socket => {
  //when ceonnect
  console.log('a user connected.');

  //take userId and socketId from user
  socket.on('addUser', userId => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //notification
  socket.on('notification', data => {
    console.log('send notification', data);
    if (data.userId) {
      const user = getUser(data.userId);
      if (user) {
        console.log(user, users);
        let message = 'you recieved a chat notification';
        io.to(user.socketId).emit('InviteNotification', {
          senderId: data.senderId,
          message,
          room: data.room
        });
      }
    }
  });

  //for a new user joining the room
  socket.on('joinRoom', ({ userId, room, username }) => {
    const p_user = join_Room(userId, room, username);
    if (p_user) {
      socket.join(p_user.room);

      //display a welcome message to the user who have joined a room
      socket.emit('message', {
        userId: p_user.userId,
        username: p_user.username,
        text: `Welcome ${p_user.username}`
      });

      //displays a joined room message to all other room users except that particular user
      socket.broadcast.to(p_user.room).emit('message', {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has joined the chat`
      });
    }
  });

  //user sending message
  socket.on('chat', ({ text, userId }) => {
    //gets the room user and the message sent
    const p_user = getUser(userId);
    if (p_user) {
      io.to(p_user.room).emit('message', {
        userId: p_user.userId,
        username: p_user.username,
        text: text
      });
    }
  });
  socket.on('roomDisconect', ({ userId }) => {
    console.log('room left', userId);
    //gets the room user and the message sent
    const p_user = getUser(userId);
    if (p_user) {
      removeUser(scoket.id);
      io.emit('getUsers', users);
    }
  });
  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
//server
http.listen(port, function () {
  console.log('Server Started');
});
