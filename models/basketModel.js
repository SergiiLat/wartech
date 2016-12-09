var models = require('../models/models');

module.exports = {
  add:function(itemId, userId,callback){
    models.Backet.create(
      {
        user_id:userId,
        item_id:itemId
      })
      .then(function () {
        callback(null)
      })
      .catch(function (err) {
        callback(err)
      });
  },
  remove:function(itemId, userId,callback){
    models.Backet.destroy({
      where: {
        user_id:userId,
        item_id:itemId
      }
    })
      .then(function () {
        callback(null)
      })
      .catch(function (err) {
        callback(err)
      });

  },
  getAll:function(userId,callback){
    models.Backet.findAll({where:{user_id:userId}})
      .then(function (items) {
        callback(null, items)
      })
      .catch(function (err) {
        callback(err)
      });
  }

};
