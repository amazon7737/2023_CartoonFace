const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "http://localhost:3001/",
//     createProxyMiddleware({
//       target: "http://localhost:3000",
//       changeOrigin: true,
//     })
//   );
// };


// module.exports = function (app) {
//   app.use(
//     "http://localhost:3001/recent",
//     createProxyMiddleware({
//       target: "http://localhost:3000",
//       changeOrigin: true,
//     })
//   );
// };



module.exports = function (app) {
  app.use(
    "http://127.0.0.1:3001/",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );
};


// module.exports = function (app) {
//   app.use(
//     "/",
//     createProxyMiddleware({
//       target: "http://localhost:3000",
//       changeOrigin: true,
//     })
//   );
// };