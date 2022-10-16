"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestCli = require("jest-cli");
const users_model_1 = require("./users/users.model");
const users_router_1 = require("./users/users.router");
const environment_1 = require("./common/environment");
const server_1 = require("./server/server");
let server;
const beforeAllTest = () => {
    environment_1.environment.db.url = process.env.DB_URL || "mongodb://localhost/api-interior-test-db";
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server
        .bootstrap([users_router_1.usersRouter])
        .then(() => users_model_1.User.remove({}).exec())
        .then(() => {
        let admin = new users_model_1.User();
        admin.nome = 'admin';
        admin.email = 'gustavo.sperandio25@gmail.com';
        admin.password = '@Goprontera1';
        admin.profiles = ['user'];
        return admin.save();
    });
};
const afterAllTests = () => {
    return server.shutdown();
};
beforeAllTest()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
