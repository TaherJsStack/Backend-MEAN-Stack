const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const Auth    = require('../models/auth');
const User    = require('../models/user');


exports.login = (req, res, next) => {
  let fetchedAuth;
  User.findOne({ email: req.body.authEmail })
  .then( user => {
    if (user === null) {
      return res.status(401).json({
        message:  'this email doesn\'t exist ::: DB',
        status: 401
      })
    }
    fetchedAuth = user;
    return bcrypt.compare( req.body.authPassword, user.password )
  })
  .then( result => {
    if (!result) {
      return res.status(401).json({
        message: 'this password doesn\'t compare ::: DB',
        status: 401
      })
    }
    const token = jwt.sign(
        {
          email:  fetchedAuth.email,
          userId: fetchedAuth._id,
          roll:   fetchedAuth.roll,
          name:   fetchedAuth.name.firstname
        },
        'secret_this_should_be_longer',
        {expiresIn: "1h"}
      );
      res.status(200)
        .json({
          token: token,
          message: token,
          expiresIn: 3600,      /// 1 hour  to => 3600 seconds
          roll: fetchedAuth.roll,
          authId: fetchedAuth._id,
          status: 200
        })
  })
  .catch(err => {
    //  console.log('catch error =>', err.message)
      return res.status(500).json({
        message: 'err => ::: error catch' + err.message,
        status: 500
      })
    })

}
