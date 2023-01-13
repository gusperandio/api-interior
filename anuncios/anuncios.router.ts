import { Anuncios } from './anuncios.model';
import { NotFoundError } from "restify-errors";
import * as restify from "restify";
import * as mongoose from "mongoose";
import { ModelRouter } from "../common/model-router";

class CategoriasRouter extends ModelRouter<Anuncios> {
  constructor() {
    super(Anuncios);
  }

  

  applyRoutes(application: restify.Server) {
    application.get({ path: `${this.basePath}` }, [
        this.findAll
      ]);
    application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);

    application.post(`${this.basePath}`, [this.save]);
    application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
    
  }
}

export const categoriasRouter = new CategoriasRouter();