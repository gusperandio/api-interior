import * as jestCli from 'jest-cli'
import { User } from "./users/users.model";
import { usersRouter } from "./users/users.router";
import { environment } from "./common/environment";
import { Server } from "./server/server";

let server: Server;
const beforeAllTest = () => {
  environment.db.url = process.env.DB_URL || "mongodb://localhost/api-interior-test-db";
  environment.server.port = process.env.SERVER_PORT || 3001;
  server = new Server();
  return server
    .bootstrap([usersRouter])
    .then(() => User.remove({}).exec())
    .then(()=>{
      let admin = new User()
      admin.nome = 'admin'
      admin.email = 'gustavo.sperandio25@gmail.com'
      admin.password = '@Goprontera1'
      admin.profiles = ['user']
      return admin.save()
    })
};

const afterAllTests = () => {
    return server.shutdown();

};

beforeAllTest()
  .then(()=>jestCli.run())
  .then(() => afterAllTests())
  .catch(console.error);
