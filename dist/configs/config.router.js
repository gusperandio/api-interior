"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configsRouter = void 0;
const config_model_1 = require("./config.model");
const model_router_1 = require("../common/model-router");
class ConfigsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(config_model_1.Configs);
    }
    // replaceSubCategorias = (req, resp, next) => {
    //   Categorias.findById(req.params.id)
    //     .then((rest) => {
    //       if (!rest) {
    //         throw new NotFoundError("Categoria não existe");
    //       } else {
    //         rest.subcategoria = req.body; //Array de MenuItem
    //         return rest.save();
    //       }
    //     })
    //     .then((rest) => {
    //       resp.json(rest.subcategoria);
    //       return next();
    //     })
    //     .catch(next);
    // };
    // findSubCategorias = (req, resp, next) => {
    //   Categorias.findById(req.params.id, "+subcategoria")
    //     .then((rest) => {
    //       if (!rest) {
    //         throw new NotFoundError("Categoria não existe");
    //       } else {
    //         resp.json(rest.subcategoria);
    //         return next();
    //       }
    //     })
    //     .catch(next);
    // };
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
            this.findAll
        ]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        // application.get(`${this.basePath}/:id/subcategoria`, [this.validateId, this.findSubCategorias]);
        application.post(`${this.basePath}`, [this.save]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        // application.put(`${this.basePath}/:id/subcategoria`, [
        //     this.validateId,
        //     this.replaceSubCategorias,
        //   ]);
    }
}
exports.configsRouter = new ConfigsRouter();
