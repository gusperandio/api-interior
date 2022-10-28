"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaEmail = exports.verificaCNPJ = exports.verificaCPF = exports.authenticate = void 0;
const empresa_model_1 = require("./../empresa/empresa.model");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
const environment_1 = require("../common/environment");
const jwt = require("jsonwebtoken");
const authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, "+password")
        .then((user) => {
        if (user && user.matches(password)) {
            //gerar o token
            const token = jwt.sign({ sub: user.cpf, iss: "api-interior" }, environment_1.environment.security.apiSecret);
            resp.json({
                validado: true,
                accessToken: token,
                id: user._id,
                profile: user.profiles[0],
                nome: user.nome,
            });
            return next(false); //Retorna false pois ja foi concluido todos processos
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError("Good bye bro"));
        }
    })
        .catch(next);
};
exports.authenticate = authenticate;
const verificaCPF = (req, resp, next) => {
    const { cpf } = req.body;
    users_model_1.User.findByCpf(cpf)
        .then((user) => {
        if (user) {
            resp.json({ validado: true });
            return next(false); //Retorna false pois ja foi concluido todos processos
        }
        else {
            return resp.json({ validado: false });
        }
    })
        .catch(next);
};
exports.verificaCPF = verificaCPF;
const verificaCNPJ = (req, resp, next) => {
    const { cnpj } = req.body;
    empresa_model_1.Empresa.findByCnpj(cnpj)
        .then((emp) => {
        if (emp) {
            resp.json({ validado: true });
            return next(false);
        }
        else {
            return resp.json({ validado: false });
        }
    })
        .catch(next);
};
exports.verificaCNPJ = verificaCNPJ;
const verificaEmail = (req, resp, next) => {
    const { email, who } = req.body;
    users_model_1.User.findByEmail(email)
        .then((us) => {
        if (us) {
            if (who) {
                resp.json({
                    validado: true,
                    idRecovery: us._id
                });
            }
            else {
                resp.json({ validado: true });
            }
            return next(false);
        }
        else {
            return resp.json({ validado: false });
        }
    })
        .catch(next);
};
exports.verificaEmail = verificaEmail;
