
var Sequelize = require('sequelize');
var db_config = require('../config').db_config;

var sequelize = new Sequelize(db_config.db , db_config.user, db_config.password, db_config.mysql);


var obj = {
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
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Backet: sequelize.define('basket', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},

        user_id: {
            type: Sequelize.INTEGER
        },
        item_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })


};

//obj.Users.sync({force: true});
//obj.Items.sync({force: true});
//obj.Backet.sync({force: true});

module.exports = obj;
