/**
 * Created by user on 22.06.2016.
 */
"use strict";
let Sequelize = require('sequelize');
let db_config = require('../config').db_config;

let sequelize = new Sequelize(db_config.db , db_config.user, db_config.password, db_config.mysql);


let obj = {
    sequelize: sequelize,
    Users: sequelize.define('users', {

        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Items: sequelize.define('items', {

        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })


};

//obj.Users.sync({force: true});
//obj.Items.sync({force: true});

module.exports = obj;