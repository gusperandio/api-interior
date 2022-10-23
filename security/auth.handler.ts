import { Empresa } from "./../empresa/empresa.model";
import * as restify from "restify";
import { NotAuthorizedError } from "restify-errors";
import { User } from "../users/users.model";
import { environment } from "../common/environment";
import * as jwt from "jsonwebtoken";

export const authenticate: restify.RequestHandler = (req, resp, next) => {
  const { email, password } = req.body;
  User.findByEmail(email, "+password")
    .then((user) => {
      if (user && user.matches(password)) {
        //gerar o token

        const token = jwt.sign(
          { sub: user.cpf, iss: "api-interior" },
          environment.security.apiSecret
        );

        resp.json({
          validado: true,
          accessToken: token,
          id: user._id,
          profile: user.profiles[0],
          nome: user.nome,
        });
        return next(false); //Retorna false pois ja foi concluido todos processos
      } else {
        return next(new NotAuthorizedError("Good bye bro"));
      }
    })
    .catch(next);
};

export const verificaCPF: restify.RequestHandler = (req, resp, next) => {
  const { cpf } = req.body;
  User.findByCpf(cpf)
    .then((user) => {
      if (user) {
        resp.json({ validado: true });
        return next(false); //Retorna false pois ja foi concluido todos processos
      } else {
        return resp.json({ validado: false });
      }
    })
    .catch(next);
};

export const verificaCNPJ: restify.RequestHandler = (req, resp, next) => {
  const { cnpj } = req.body;
  Empresa.findByCnpj(cnpj)
    .then((emp) => {
      if (emp) {
        resp.json({ validado: true });
        return next(false);
      } else {
        return resp.json({ validado: false });
      }
    })
    .catch(next);
};

export const verificaEmail: restify.RequestHandler = (req, resp, next) => {
  const { email, who } = req.body;

  User.findByEmail(email)
    .then((us) => {
      if (us) {
        if (who) {
          resp.json({
            validado: true,
            idRecovery: us._id
          });
        } else {
          resp.json({ validado: true });
        }

        return next(false);
      } else {
        return resp.json({ validado: false });
      }
    })
    .catch(next);
};
