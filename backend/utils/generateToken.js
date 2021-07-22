const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, "somekey", {
    expiresIn: '1d',
  });
};

module.exports = generateToken;