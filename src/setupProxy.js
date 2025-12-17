const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://luiz1432-001-site1.site4future.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
