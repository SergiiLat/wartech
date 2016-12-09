var basketModel = require('../models/basketModel');


module.exports = (function () {
  return {
    addToBasket: function (req, res) {
     var userId = req.user.id;
     var itemId = req.body.productId;

     basketModel.add(itemId, userId,function (err, result) {
       if (err) res.send({error:true,msg:"Error"})
       res.send({error:false,msg:"ok"});
      });
    },
    removeFromBasket: function (req, res) {
      var userId = req.user.id;
      var itemId = req.body.productId;

      basketModel.remove(itemId, userId,function (err, result) {
        if (err) res.send({error:true,msg:"Error"})
          res.send({error:false,msg:"ok"});

      });
    },
    showBasket : function (req, res) {
      var userId = req.user.id;
      basketModel.getAll(userId,function (err, result) {
        if (err) res.send({error:true,msg:"Error"})
        res.send({error:false,msg:"ok",data:result});
      });
    },
  }
})();
