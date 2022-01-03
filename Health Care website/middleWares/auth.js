  const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send({
      success: false,
      message: 'Access denied. No token provided.',
    });

  try {
    const decoded = jwt.verify(token, 'token');
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send({
      success: false,
      message: 'Access denied. No token provided.',
    });

  try {
    const decoded = jwt.verify(token, 'token');
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
  }
};