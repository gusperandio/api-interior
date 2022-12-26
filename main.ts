import { configsRouter } from './configs/config.router';
import { vagasRouter } from "./vagas/vagas.router";
import { empresasRouter } from "./empresa/empresa.router";
import { Server } from "./server/server";
import { usersRouter } from "./users/users.router";
const server = new Server();

server
  .bootstrap([
    usersRouter,
    empresasRouter,
    vagasRouter,
    configsRouter
  ])
  .then((server) => {
    console.log("Server is listening on:", server.application.address());
  })
  .catch((error) => {
    console.log("Server failed to start");
    console.error(error);
    process.exit(1);
  });
