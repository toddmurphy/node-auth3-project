const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //grab the token from the headers
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      //decodedToken === payload from signToken
      if (error) {
        //the token is not valid

        res.status(401).json({ messsage: 'Sorry, token not valid' });
      } else {
        req.user = decodedToken.user;
        next();
      }
    });
  } else {
    res.status(401).json({ messsage: 'You, shall not pass!' });
  }
};
