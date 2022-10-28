"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasRouter = void 0;
const categorias_model_1 = require("./categorias.model");
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
class CategoriasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(categorias_model_1.Categorias);
        this.replaceSubCategorias = (req, resp, next) => {
            categorias_model_1.Categorias.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Categoria não existe");
                }
                else {
                    rest.subcategoria = req.body; //Array de MenuItem
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.subcategoria);
                return next();
            })
                .catch(next);
        };
        this.findSubCategorias = (req, resp, next) => {
            categorias_model_1.Categorias.findById(req.params.id, "+subcategoria")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Categoria não existe");
                }
                else {
                    resp.json(rest.subcategoria);
                    return next();
                }
            })
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
            this.findAll
        ]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.get(`${this.basePath}/:id/subcategoria`, [this.validateId, this.findSubCategorias]);
        application.post(`${this.basePath}`, [this.save]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.put(`${this.basePath}/:id/subcategoria`, [
            this.validateId,
            this.replaceSubCategorias,
        ]);
    }
}
exports.categoriasRouter = new CategoriasRouter();