const users = require('../data/users').users;
module.exports = async (req, res, next) => {
  const ticket = req.get('Dctm-Ticket');
  if (!users.find((item) => item.ticket === ticket)) {
    return res.send({
      data: [{ httpStatus: 'UNAUTHORIZED', httpStatusCode: 401 }],
    });
  }
  next();
};
