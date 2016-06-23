/**
 * Created by user on 22.06.2016.
 */
"use strict";
var express = require('express');
var router = express.Router();
var loginCtrl = require('./controllers/loginCtrl');
var userCtrl = require('./controllers/userCtrl');

/**
 * @apiDefine user User access only
 * This optional description belong to authenticate user.
 */

/**
 * @api {post} /api/login  Authentication
 * @apiName Login
 * @apiGroup Basic
 *
 * @apiParam {String} email Email пользователя
 * @apiParam {String} password Пароль
 *
 * 
 * @apiSuccess {String} token Token for User.
 * 
 * @apiError UserNotFound The pair email and password was not found.
 */
router.post('/api/login',loginCtrl.login);

/**
 * @api {get} /api/logout  Logout
 * @apiName Logout
 * @apiGroup Basic
 *
 * @apiSuccess {String} body  ok
 *
 */
router.get('/api/logout',loginCtrl.logout);

/**
 * @api {post} /api/register  Registration
 * @apiName Registration
 * @apiGroup Basic
 *
 * @apiParam {String} name Имя пользователя
 * @apiParam {String} email Email пользователя
 * @apiParam {String} password Пароль
 *
 * @apiSuccess {String} token Token for User.
 * 
 * @apiError EmailError Bad request email isn\'t specified.
 * @apiError PasswordError Bad request password isn\'t specified.
 * @apiError EmailDublicateError Bad request email is used. 
 *
 */
router.post('/api/register',userCtrl.addUser);

router.use(loginCtrl.checkToken);

/**
 * @api {get} /api/profile  GetDetailInfo
 * @apiName UserDetail
 * @apiGroup Basic
 * @apiPermission user
 *

 * @apiSuccess {Object} User       User profile.
 * @apiSuccess {Number}   User.id   Users id.
 * @apiSuccess {String}   User.name   Users name.
 * @apiSuccess {String}   User.email  Users email.
 * @apiSuccess {String}   User.password  Users password.
 * @apiSuccess {Date}   User.createdAt  Users createdAt.
 * @apiSuccess {Date}   User.updatedAt  Users updatedAt.
 *
 * @apiError UserNotFound The pair email and password was not found.
 * 
 */
router.get('/api/profile',userCtrl.getUserInfo);


module.exports = router;