module.exports = app => {
  const users = require('../controllers/users.controller.js');

  // Create a new User
  app.post('/users', users.create);

  // Retrieve all Users
  app.get('/users', users.findAll);

  // Retrieve a single User with userId
  app.get('/users/:userId', users.findOne);

  // Update a User with userId
  app.put('/users/:userId', users.update);

  // Delete a User with userId
  app.delete('/users/:userId', users.delete);

  // Log User In
  app.post('/users/login', users.signIn);

  //Activate User
  app.get('/user/activate/:hash', users.activateUser);
};
