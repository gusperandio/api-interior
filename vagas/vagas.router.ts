import { User } from './../users/users.model';
import { NotFoundError } from 'restify-errors';
import { Vagas } from "./vagas.model";
import * as restify from "restify";
import * as mongoose from "mongoose";
import { ModelRouter } from "../common/model-router";
import { authorize } from "../security/authz.handler";

class VagasRouter extends ModelRouter<Vagas> {
  constructor() {
    super(Vagas);
  }

  protected prepareOne(
    query: mongoose.Query<Vagas, Vagas>
  ): mongoose.Query<Vagas, Vagas> {
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

  replaceCandidatuas = (req, resp, next) => {
    Vagas.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Vaga não existe");
        } else {
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

  findCandidaturas = (req, resp, next) =>{
    Vagas.findById(req.params.id, '+candidaturas').populate({ path: 'candidaturas.userId', model: 'User'})
    .then(rest =>{
      if(!rest){
        throw new NotFoundError('Vaga não existe');
      }else{
        resp.json(rest.candidaturas)
        return next();
      }
    })
    .catch(next)
  }

  applyRoutes(application: restify.Server) {
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

export const vagasRouter = new VagasRouter();
