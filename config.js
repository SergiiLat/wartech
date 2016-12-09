"use strict";

module.exports.secret = 'wartech';

module.exports.db_config = {
    db : 'wartech',
    user : 'wartech',
    password : 'qwerty',
    mysql : {
        host: '93.171.158.114',
        dialect: 'mysql',
        collate: "utf8_general_ci",
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
};