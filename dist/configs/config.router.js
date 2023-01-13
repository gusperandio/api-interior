"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configsRouter = void 0;
const config_model_1 = require("./config.model");
const restify_errors_1 = require("restify-errors");
const model_router_1 = require("../common/model-router");
class ConfigsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(config_model_1.Configs);
        this.replaceCategorias = (req, resp, next) => {
            config_model_1.Configs.findById(req.params.id)
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Categoria não existe");
                }
                else {
                    rest.categorias = req.body;
                    return rest.save();
                }
            })
                .then((rest) => {
                resp.json(rest.categorias);
                return next();
            })
                .catch(next);
        };
        this.findCategorias = (req, resp, next) => {
            config_model_1.Configs.findById(req.params.id, "+categorias")
                .then((rest) => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError("Categoria não existe");
                }
                else {
                    resp.json(rest.categorias);
                    return next();
                }
            })
                .catch(next);
        };
    }
    // findSubCategorias = (req, resp, next) => {
    //   Configs.findById(req.params.id, "+categorias")
    //     .then((rest) => {
    //       if (!rest) {
    //         throw new NotFoundError("Categoria não existe");
    //       } else {
    //         rest.categorias.forEach(element => {
    //           console.log(element._id)
    //         });
    //         resp.json(rest.categorias);
    //         return next();
    //       }
    //     })
    //     .catch(next);
    // };
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
            this.findAll,
        ]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        // application.get(`${this.basePath}/:id/subcategoria`, [this.validateId, this.findSubCategorias]);
        application.post(`${this.basePath}`, [this.save]);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.put(`${this.basePath}/:id/categoria`, [
            this.validateId,
            this.replaceCategorias,
        ]);
        application.get(`${this.basePath}/:id/categoria`, [
            this.validateId,
            this.findCategorias,
        ]);
    }
}
exports.configsRouter = new ConfigsRouter();
