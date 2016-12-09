var itemModel = require('../models/itemModel');


module.exports = (function () {
  return {
    getAllItems: function (req, res) {
      itemModel.getAll(function (err, items) {
        if (err)
        {
          res.status(404).send({
            success: false,
            message: 'Some isnt wrong'
          });
        }
        else
        {
          res.send(items);
        }

      });
    }
  }
})();
