var models = require('../models/models');

module.exports = {
    addUser: function (new_user, callback) {
        models.Users.create(new_user)
            .then(function (user) {
                if (user == null)
                {
                    callback({msg:"UserNotFound"})
                }
                else
                {
                    callback(null, user.dataValues)
                }
            })
            .catch(function (err) {
                callback(err)
            })
    },
    getUserBy: function (params, callback) {
        models.Users.findOne({where:params})
            .then(function (user) {
                if (user == null)
                {
                    callback({msg:"UserNotFound"})
                }
                else
                {
                    callback(null, user.dataValues)
                }

            })
            .catch(function (err) {
                callback(err)
            });
    }

};
