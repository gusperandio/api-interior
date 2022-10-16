"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vagasRouter = void 0;
const restify_errors_1 = require("restify-errors");
const vagas_model_1 = require("./vagas.model");
const model_router_1 = require("../common/model-router");
class VagasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(vagas_model_1.Vagas);
        this.replaceCandidatuas = (req, resp, next) => {
            vagas_model_1.Vagas.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Vaga não existe");
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
        this.findCandidaturas = (req, resp, next) => {
            vagas_model_1.Vagas.findById(req.params.id, '+candidaturas').populate({ path: 'candidaturas.userId', model: 'User' })
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Vaga não existe');
                }
                else {
                    resp.json(rest.candidaturas);
                    return next();
                }
            })
                .catch(next);
        };
    }
    prepareOne(query) {
        return query.populate("empresaId", ["nomeEmpresa", "cidade"]);
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.empresaId._id
            ? document.empresaId._id
            : document.empresaId;
        resource._links.empresaId = `/empresas/${restId}`;
        return resource;
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.get(`${this.basePath}/:id/candidaturas`, [this.validateId, this.findCandidaturas]);
        application.post(`${this.basePath}`, [this.save]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.put(`${this.basePath}/:id/candidaturas`, [
            this.validateId,
            this.replaceCandidatuas,
        ]);
    }
}
exports.vagasRouter = new VagasRouter();
