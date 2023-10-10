const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('./routes/api')(app);
require('./routes/auth')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
