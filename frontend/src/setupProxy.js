const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://insta-clone-app-backend-1:8080', // Use the backend container name
      changeOrigin: true,
    })
  );
};
