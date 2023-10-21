const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const target = process.env.API_PROXY_TARGET || 'http://localhost:8080'; // Default to localhost:8080 if the env variable is not set

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      // secure: false,
    })
  );
};

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//     })
//   );
// };