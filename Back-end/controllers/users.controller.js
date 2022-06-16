const { smtpTransport, mailOptions } = require('../mail');
const UserModel = require('../models/users.model');
require('dotenv').config();

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: 'user can not be empty'
    });
  }
  // Create a User
  const User = new UserModel({
    name: req.body.name || 'Untitled Name',
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    isActive: false
  });
  //save a User
  User.save()
    .then(user => {
      //send mail to user
      smtpTransport.sendMail(mailOptions(req, user), function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).send({
            message: error
          });
        } else {
          console.log('Email sent: ' + info.response);
          res.send({ user: user, code: 200 });
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        code: 500,
        message: err.message || 'Some error occurred while creating the User.'
      });
    });
  smtpTransport.close();
};

exports.findAll = (req, res) => {
  UserModel.find()
    .then(users => {
      res.status(200).send({ data: users, code: 200 });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    });
};

exports.findOne = (req, res) => {
  UserModel.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'user not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'user not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userId
      });
    });
};

exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: 'user can not be empty'
    });
  }
  const user = await UserModel.findById(req.params.userId);
  if (user) {
    UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        phone: req.body.phone || user.phone,
        password: req.body.password || user.password,
        isActive: req.body.isActive || user.isActive
      },
      { new: true }
    )
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user not found with id ' + req.params.userId
          });
        }
        res.send(user);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'user not found with id ' + req.params.userId
          });
        }
        return res.status(500).send({
          message: 'Error updating user with id ' + req.params.userId
        });
      });
  } else {
    return res.status(404).send({
      message: 'User not found with id ' + req.params.userId
    });
  }
};

exports.delete = (req, res) => {
  UserModel.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'user not found with id ' + req.params.userId
        });
      }
      res.send({ message: 'user deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'user not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.userId
      });
    });
};

exports.signIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'user can not be empty'
    });
  }
  // fetch the user and test password verification
  UserModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.status(500).send({
        message: err || 'network error'
      });
    }
    if (!user) {
      return res.status(401).send({
        message: 'user not found'
      });
    }
    if (user.isActive) {
      const userData = {
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive
      };
      // test a matching password
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          return res.status(400).send({
            message: err || 'network error'
          });
        }
        if (isMatch) {
          return res.send({
            message: 'successfully logged in',
            code: 200,
            data: userData
          });
        } else {
          return res.status(400).send({
            message: 'incorrect password'
          });
        }
      });
    } else {
      return res.status(404).send({
        message: 'Kindly confirm your email.'
      });
    }
  });
};

exports.activateUser = async (req, res) => {
  const { hash } = req.params;
  try {
    const user = await UserModel.findById(hash);
    if (user) {
      UserModel.findByIdAndUpdate(
        hash,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
          isActive: true
        },
        { new: true }
      )
        .then(user => {
          res.send({ message: `User ${hash} has been activated`, code: 200 });
        })
        .catch(err => {
          console.log(err);
          res.status(422).send('User cannot be activated!');
        });
    } else {
      return res.status(404).send({
        message: 'User not found with id ' + hash
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
};
