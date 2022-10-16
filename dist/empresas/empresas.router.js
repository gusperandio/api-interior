"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaRouter = void 0;
const restify_errors_1 = require("restify-errors");
const empresas_model_1 = require("./empresas.model");
const auth_handler_1 = require("./../security/auth.handler");
const model_router_1 = require("../common/model-router");
class EmpresasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(empresas_model_1.Empresa);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                empresas_model_1.Empresa.findByEmail(req.query.email)
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
            empresas_model_1.Empresa.findById(req.params.id, "+contatos").then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Usuário não existe');
                }
                else {
                    resp.json(rest.contatos);
                    return next();
                }
            }).catch(next);
        };
        this.on("beforeRender", (document) => {
            document.password = undefined;
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
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticateEmp);
        application.get(`${this.basePath}/:id/contatos`, [this.validateId, this.findContatos]);
    }
}
exports.empresaRouter = new EmpresasRouter();
