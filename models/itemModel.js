"use strict";
let models = require('../models/models');


module.exports = {
  getAll: function (callback) {
    models.Items.findAll()
      .then(function (items) {

          callback(null, items)
      })
      .catch(function (err) {
        callback(err)
      });
  }

};