/**
 * Created by user on 22.06.2016.
 */
"use strict";

let userModel = require('../models/userModel');
let jwt = require('jsonwebtoken');
let secret = require('../config').secret;

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

                    let token = jwt.sign(user, secret, {
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
            let token;
            if (req.headers && req.headers.authorization) {
                let parts = req.headers.authorization.split(' ');
                if (parts.length == 2) {
                    let scheme = parts[0],
                        credentials = parts[1];

                    if (/^Bearer$/i.test(scheme)) {
                        token = credentials;
                    }
                } else {
                    return res.status(401).json({err: 'Format is Authorization: Bearer [token]'});
                }
            }

            //   let token = req.body.token || req.query.token || req.headers['Authorization'];
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


