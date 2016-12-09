"use strict";

let userModel = require('../models/itemModel');


module.exports = (function () {
  return {
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