const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.dododraft.com/api',
    changeOrigin: true,
    secure: true,
  })
);

// Serve static files
app.use(express.static(__dirname + '/dist/dodo-draft'));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/dodo-draft/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 4200);
