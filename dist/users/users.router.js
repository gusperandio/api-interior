"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const auth_handler_1 = require("./../security/auth.handler");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("./users.model");
const model_router_1 = require("../common/model-router");
const auth_handler_2 = require("../security/auth.handler");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then((user) => (user ? [user] : []))
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url,
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.findContatos = (req, resp, next) => {
            users_model_1.User.findById(req.params.id, "+contatos")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    resp.json(rest.contatos);
                    return next();
                }
            })
                .catch(next);
        };
        this.findFormacoes = (req, resp, next) => {
            users_model_1.User.findById(req.params.id, "+formacaoEdu")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    resp.json(rest.formacaoEdu);
                    return next();
                }
            })
                .catch(next);
        };
        this.findExps = (req, resp, next) => {
            users_model_1.User.findById(req.params.id, "+expProfissional")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    resp.json(rest.expProfissional);
                    return next();
                }
            })
                .catch(next);
        };
        this.findCursos = (req, resp, next) => {
            users_model_1.User.findById(req.params.id, "+cursos")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    resp.json(rest.cursos);
                    return next();
                }
            })
                .catch(next);
        };
        this.findIdiomas = (req, resp, next) => {
            users_model_1.User.findById(req.params.id, "+idiomas")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    resp.json(rest.idiomas);
                    return next();
                }
            })
                .catch(next);
        };
        this.findCandidaturas = (req, resp, next) => {
            users_model_1.User.findById(req.params.id, "+candidaturas").populate({ path: 'candidaturas.vagaId', model: 'Vaga' })
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    resp.json(rest.candidaturas);
                    return next();
                }
            })
                .catch(next);
        };
        this.replaceContatos = (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    rest.contatos = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.contatos);
                return next();
            })
                .catch(next);
        };
        this.replaceFormacoes = (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    rest.formacaoEdu = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.formacaoEdu);
                return next();
            })
                .catch(next);
        };
        this.replaceExp = (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    rest.expProfissional = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.expProfissional);
                return next();
            })
                .catch(next);
        };
        this.replaceCursos = (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    rest.cursos = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.cursos);
                return next();
            })
                .catch(next);
        };
        this.replaceIdiomas = (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    rest.idiomas = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.idiomas);
                return next();
            })
                .catch(next);
        };
        this.replaceCandidaturas = (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Usuário não existe");
                }
                else {
                    rest.candidaturas = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.candidaturas);
                return next();
            })
                .catch(next);
        };
        this.on("beforeRender", (document) => {
            document.password = undefined;
            //delete document.password
        });
    }
    prepareOne(query) {
        return query
            .populate("candidaturas", ["tituloVaga"]);
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
            this.findByEmail,
            this.findAll,
        ]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, [this.save]);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.post(`${this.basePath}/authenticate`, auth_handler_2.authenticate);
        application.post(`${this.basePath}/authenticateCPF`, auth_handler_1.verificaCPF);
        application.post(`${this.basePath}/authenticateEmail`, auth_handler_1.verificaEmail);
        application.get(`${this.basePath}/:id/contatos`, [
            this.validateId,
            this.findContatos,
        ]);
        application.get(`${this.basePath}/:id/formacaoEdu`, [
            this.validateId,
            this.findFormacoes,
        ]);
        application.get(`${this.basePath}/:id/expProfissional`, [
            this.validateId,
            this.findExps,
        ]);
        application.get(`${this.basePath}/:id/cursos`, [
            this.validateId,
            this.findCursos,
        ]);
        application.get(`${this.basePath}/:id/idiomas`, [
            this.validateId,
            this.findIdiomas,
        ]);
        application.get(`${this.basePath}/:id/candidaturas`, [
            this.validateId,
            this.findCandidaturas,
        ]);
        application.put(`${this.basePath}/:id/contatos`, [
            this.validateId,
            this.replaceContatos,
        ]);
        application.put(`${this.basePath}/:id/formacaoEdu`, [
            this.validateId,
            this.replaceFormacoes,
        ]);
        application.put(`${this.basePath}/:id/expProfissional`, [
            this.validateId,
            this.replaceExp,
        ]);
        application.put(`${this.basePath}/:id/cursos`, [
            this.validateId,
            this.replaceCursos,
        ]);
        application.put(`${this.basePath}/:id/idiomas`, [
            this.validateId,
            this.replaceIdiomas,
        ]);
        application.put(`${this.basePath}/:id/candidaturas`, [
            this.validateId,
            this.replaceCandidaturas,
        ]);
    }
}
exports.usersRouter = new UsersRouter();
