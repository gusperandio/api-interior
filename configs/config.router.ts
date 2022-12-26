import { Configs } from "./config.model";
import { NotFoundError } from "restify-errors";
import * as restify from "restify";
import * as mongoose from "mongoose";
import { ModelRouter } from "../common/model-router";

class ConfigsRouter extends ModelRouter<Configs> {
  constructor() {
    super(Configs);
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

  applyRoutes(application: restify.Server) {
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

export const configsRouter = new ConfigsRouter();