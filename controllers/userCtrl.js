"use strict";

let userModel = require('../models/userModel');
let jwt = require('jsonwebtoken');
let secret = require('../config').secret;

module.exports = (function () {
    return {
        addUser: function (req, res) {

            // check email
            if (!req.body.email || req.body.email == null || req.body.email.trim() == '') {
                res.status(400).json({
                    err: 'Bad request email isn\'t specified'
                });
            }
            // check password
            if (!req.body.password || req.body.password == null || req.body.password.trim() == '') {
                res.status(400).json({
                    err: 'Bad request password isn\'t specified'
                });
            }
            // chech dublicate
            if (req.body.email) {
                userModel.getUserBy({email:req.body.email}, function (err, user) {

                    if (user != null) {
                        res.status(400).json({
                            err: 'Bad request email is used'
                        });
                    }
                    else {

                        userModel.addUser({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        }, function (err, user) {
                            if (err) {
                                res.status(500).json({err:err});
                            }
                            else {
                                let token = jwt.sign(user, secret, {
                                    expiresIn: "1h" // expires 1 hour in
                                });
                                res.status(201).json({token: token});
                            }


                        });
                    }


                });
            }


        },
        getUserInfo: function (req, res) {
            userModel.getUserBy({id:req.user.id}, function (err, user) {
                if (err)
                {
                    res.status(404).send({
                        success: false,
                        message: 'User not found'
                    });
                }
                else
                {
                    res.send(user);    
                }
                
                
                
            });

        }
        

    }
})();