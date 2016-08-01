var levelup = require('levelup');

var db = levelup('./orderdb');

function submitOrder(req, res, next) {
  return db.get(req.orderNo, function(err, value) {
    if (err) {
      if (err.notFound) {
        return db.put(req.orderNo, req.deliveryDate, function(err) {
          if (err) {
            return res.status(500).json({'error': 'internal server error'});
          }
          return next();
        });
      }
      return res.status(500).json({'error': 'internal server error'});
    }
    return res.status(500).json({'error': 'internal server error'});
  });
};

exports.submitOrder = submitOrder;

function getOrder(req, res, next) {
  return db.get(req.params.orderNo, function(err, value) {
    if (err) {
      if (err.notFound) {
        return res.status(404).json({'error': 'not found'});
      }
      return res.status(500).json({'error': 'internal server error'});
    }
    req.orderNo = req.params.orderNo;
    req.deliveryDate = value;
    return next();
  });
};

exports.getOrder = getOrder;
