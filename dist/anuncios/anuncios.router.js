"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasRouter = void 0;
const anuncios_model_1 = require("./anuncios.model");
const model_router_1 = require("../common/model-router");
class CategoriasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(anuncios_model_1.Anuncios);
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}` }, [
            this.findAll
        ]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, [this.save]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
    }
}
exports.categoriasRouter = new CategoriasRouter();
