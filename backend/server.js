const http = require('http');
const app = require('./app.js');

const port = process.env.PORT || 4201;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);