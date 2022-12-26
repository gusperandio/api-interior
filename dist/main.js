"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_router_1 = require("./configs/config.router");
const vagas_router_1 = require("./vagas/vagas.router");
const empresa_router_1 = require("./empresa/empresa.router");
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.Server();
server
    .bootstrap([
    users_router_1.usersRouter,
    empresa_router_1.empresasRouter,
    vagas_router_1.vagasRouter,
    config_router_1.configsRouter
])
    .then((server) => {
    console.log("Server is listening on:", server.application.address());
})
    .catch((error) => {
    console.log("Server failed to start");
    console.error(error);
    process.exit(1);
});
