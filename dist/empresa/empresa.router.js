"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresasRouter = void 0;
const restify_errors_1 = require("restify-errors");
const auth_handler_1 = require("./../security/auth.handler");
const empresa_model_1 = require("./empresa.model");
const model_router_1 = require("../common/model-router");
class EmpresasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(empresa_model_1.Empresa);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                empresa_model_1.Empresa.findByEmail(req.query.email)
                    .then((empresa) => (empresa ? [empresa] : []))
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
            empresa_model_1.Empresa.findById(req.params.id, "+contatos")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Empresa não existe");
                }
                else {
                    resp.json(rest.contatos);
                    return next();
                }
            })
                .catch(next);
        };
        this.replaceContatos = (req, resp, next) => {
            empresa_model_1.Empresa.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Empresa não existe");
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
        this.on("beforeRender", (document) => {
            document.password = undefined;
            //delete document.password
        });
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
            this.findByEmail,
            this.findAll,
        ]);
        // application.get({ path: "/users", version: "1.0.0" }, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, [this.save]);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.post(`${this.basePath}/authenticateCNPJ`, auth_handler_1.verificaCNPJ);
        application.post(`${this.basePath}/authenticateEmail`, auth_handler_1.verificaEmail);
        application.get(`${this.basePath}/:id/contatos`, [
            this.validateId,
            this.findContatos,
        ]);
        application.put(`${this.basePath}/:id/contatos`, [
            this.validateId,
            this.replaceContatos,
        ]);
    }
}
exports.empresasRouter = new EmpresasRouter();
