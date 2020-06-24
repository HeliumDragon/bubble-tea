const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'src/data/teas.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(5050, () => {
  console.log('JSON Server is running');
});
