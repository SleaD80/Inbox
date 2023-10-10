const tasks = require('../data/tasks');
const requireTicket = require('../middleware/requireTicket');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  app.get('/api/dctm/v1/tasks', requireTicket, (req, res) => {
    const data = req.query;
    const tasksList = tasks.tasks[data.user];
    if (tasksList) {
      return res.send({
        data: tasksList.map((item) => {
          return {
            ...item,
            dateSent: new Date(item.dateSent).getTime(),
            dueDate: new Date(item.dueDate).getTime(),
          };
        }),
      });
    }
    return res.send({
      data: [{ httpStatus: 'USER NOT FOUND', httpStatusCode: 400 }],
    });
  });

  app.get('/api/dctm/v1/content', requireTicket, (req, res) => {
    const data = req.query;
    const content = tasks.content.find((item) => data.objectId === item.id);
    if (content) {
      try {
        fileData = fs.readFileSync(
          path.join(__dirname, '..', 'content', content.path),
          'base64'
        );
        return res.send({
          data: [{ mimeType: content.mimeType, data: fileData }],
        });
      } catch (e) {
        return res.send({
          data: [{ httpStatus: 'FILE NOT FOUND', httpStatusCode: 500 }],
        });
      }
    }
    return res.send({
      data: [{ httpStatus: 'CONTENT NOT FOUND', httpStatusCode: 400 }],
    });
  });
};
