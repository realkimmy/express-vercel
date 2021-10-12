const express = require('express');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3030; // default port to listen

setTimeout(() => {
  console.log(Date.now())
}, 1000);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);

// default catch all handler
app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;
