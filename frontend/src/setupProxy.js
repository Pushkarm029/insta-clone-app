const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Replace YOUR_BACKEND_PORT with the port your Go backend is running on (e.g., 8000)
      changeOrigin: true,
    })
  );
};
