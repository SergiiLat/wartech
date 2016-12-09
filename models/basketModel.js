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
        id:itemId
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
    models.Backet.qu



    models.sequelize.query("select basket.id,basket.user_id,basket.item_id,items.name,items.price from basket join items  on items.id = basket.item_id WHERE user_id="+userId)
      .then(function (items) {
        callback(null, items[0])
      })
      .catch(function (err) {
        callback(err)
      });
  }

};
