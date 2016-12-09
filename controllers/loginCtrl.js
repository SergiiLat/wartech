

var userModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

module.exports = (function () {
    return {
        login: function (req, res) {
            userModel.getUserBy({email: req.body.email, password: req.body.password}, function (err, user) {
                if (err) {
                    res.json({
                        message: err.msg,
                        token: ''
                    });
                }
                else {

                    var token = jwt.sign(user, secret, {
                        expiresIn: "1h" // expires 1 hour in
                    });

                    res.status(200).json({token: token,name:user.name});
                  
                }


            });

        },
        logout: function (req, res) {
            res.removeHeader('authorization');

            res.end('ok');
        },
        checkToken: function (req, res, next) {
            let token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'] || req.cookies.token;
            if (token) {

                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        return res.status(401).json({err:'Bad token provided.'});
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.user = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(401).json({err:'No token provided.'});

            }
        }

    }

})();
