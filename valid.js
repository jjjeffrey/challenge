function order(req, res, next) {
  if (req.params.orderNo.length === 19
  &&  /^[0-9]{3}-[0-9]{7}-[0-9]{7}$/.test(req.params.orderNo)) {
    return next();
  } else {
    return res.status(500).json({'error': 'internal server error'});
  }
}

exports.order = order;

function textarea(req, res, next) {
  var orderRegex = /[0-9]{3}-[0-9]{7}-[0-9]{7}/;
  var deliveryDateRegex = /([A-Z][a-z]{2}\.|[A-Z][a-z]{2,8})\ [0-9]{1,2}(st|nd|rd|th)?,\ [0-9]{4}/gi;
  if (req.body.deliveryinfo.length < 200) {
    var orderNo = req.body.deliveryinfo.match(orderRegex);
    var deliveryDates = req.body.deliveryinfo.match(deliveryDateRegex);
    if (orderNo == null || deliveryDates == null) {
      return res.status(500).json({'error': 'internal server error'});
    }
  }
  req.orderNo = orderNo;
  req.deliveryDate = new Date(deliveryDates.pop().replace(/st|nd|rd|th/, ''));
  req.deliveryDate = req.deliveryDate.toISOString().split('T')[0];
  return next();
}

exports.textarea = textarea;
