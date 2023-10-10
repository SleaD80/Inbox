const users = require('../data/users').users;
const requireTicket = require('../middleware/requireTicket');

module.exports = (app) => {
  app.post('/api/dctm/v1/login', (req, res) => {
    const data = req.body;
    const user = users.find((item) => item.username === data.userName);
    if (user) {
      if (data.userTicket === user.password) {
        return res.send({
          data: [{ userName: user.username, userTicket: user.ticket }],
        });
      }
    }
    return res.send({
      data: [{ httpStatus: 'UNAUTHORIZED', httpStatusCode: 401 }],
    });
  });

  app.get('/api/dctm/v1/userInfo', requireTicket, (req, res) => {
    const data = req.query;
    const user = users.find((item) => item.username === data.user);
    if (user) {
      return res.send({
        data: [
          { id: user.id, address: user.address, description: user.description },
        ],
      });
    }
    return res.send({
      data: [{ httpStatus: 'USER NOT FOUND', httpStatusCode: 400 }],
    });
  });
};
