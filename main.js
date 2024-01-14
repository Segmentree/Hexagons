var express = require('express');
var path = require('path');
var livereload = require('livereload');
var connectLiveReload = require('connect-livereload');

const port = 5050;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

var app = express();

app.use(connectLiveReload());
app.use(express.static(path.join(__dirname, '/src')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
