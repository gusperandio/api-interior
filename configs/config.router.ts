import { Configs } from "./config.model";
import { NotFoundError } from "restify-errors";
import * as restify from "restify";
import * as mongoose from "mongoose";
import { ModelRouter } from "../common/model-router";

class ConfigsRouter extends ModelRouter<Configs> {
  constructor() {
    super(Configs);
  }

  replaceCategorias = (req, resp, next) => {
    Configs.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Categoria não existe");
        } else {
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

  findCategorias = (req, resp, next) => {
    Configs.findById(req.params.id, "+categorias")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Categoria não existe");
        } else {
          resp.json(rest.categorias);
          return next();
        }
      })
      .catch(next);
  };
 
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

  applyRoutes(application: restify.Server) {
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

export const configsRouter = new ConfigsRouter();
