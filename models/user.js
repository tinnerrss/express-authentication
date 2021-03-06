'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email adress'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
      len: {
        args: [8, 99],
        msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options) {
        if (createdUser && createdUser.password) {
          let hash = bcrypt.hashSync(createdUser.password, 10);
          createdUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  //compares entered password to hased password
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };
  //removes the password before serializing
  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }
  return user;
};