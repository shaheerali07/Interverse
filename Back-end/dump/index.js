const c_users = [];

// get all users
function getUserList() {
  return c_users;
}

function addUser(userId, socketId) {
  !c_users.some(user => user.userId === userId) &&
    c_users.push({ userId, socketId });
  return c_users;
}
// joins the user to the specific chatroom
function join_User(id, username, room) {
  const p_user = { id, username, room };

  c_users.push(p_user);
  console.log(c_users, 'users');

  return p_user;
}

console.log('user out', c_users);

// Gets a particular user id to return the current user
function get_Current_User(id) {
  return c_users.find(p_user => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
  const index = c_users.findIndex(p_user => p_user.id === id);

  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}
const removeUser = socketId => {
  users = c_users.filter(user => user.socketId !== socketId);
};

module.exports = {
  getUserList,
  addUser,
  join_User,
  get_Current_User,
  user_Disconnect,
  removeUser
};
