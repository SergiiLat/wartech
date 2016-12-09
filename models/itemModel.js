var models = require('../models/models');

module.exports = {
  getAll: function (callback) {
    models.Items.findAll()
      .then(function (items) {
          callback(null, items.dataValues)
      })
      .catch(function (err) {
        callback(err)
      });
  }

};
