import { NotFoundError } from "restify-errors";
import { verificaCNPJ, verificaEmail } from "./../security/auth.handler";
import { authorize } from "../security/authz.handler";
import * as restify from "restify";
import { Empresa } from "./empresa.model";
import { ModelRouter } from "../common/model-router";

class EmpresasRouter extends ModelRouter<Empresa> {
  constructor() {
    super(Empresa);
    this.on("beforeRender", (document) => {
      document.password = undefined;
      //delete document.password
    });
  }

  findByEmail = (req, resp, next) => {
    if (req.query.email) {
      Empresa.findByEmail(req.query.email)
        .then((empresa) => (empresa ? [empresa] : []))
        .then(
          this.renderAll(resp, next, {
            pageSize: this.pageSize,
            url: req.url,
          })
        )
        .catch(next);
    } else {
      next();
    }
  };

  findContatos = (req, resp, next) => {
    Empresa.findById(req.params.id, "+contatos")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Empresa não existe");
        } else {
          resp.json(rest.contatos);
          return next();
        }
      })
      .catch(next);
  };

  replaceContatos = (req, resp, next) => {
    Empresa.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Empresa não existe");
        } else {
          rest.contatos = req.body; //Array de MenuItem
          return rest.save();
        }
      })
      .then((rest) => {
        resp.json(rest.contatos);
        return next();
      })
      .catch(next);
  };  

  applyRoutes(application: restify.Server) {
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
    application.post(`${this.basePath}/authenticateCNPJ`, verificaCNPJ);
    application.post(`${this.basePath}/authenticateEmail`, verificaEmail);

    application.get(`${this.basePath}/:id/contatos`, [
      this.validateId,
      this.findContatos,
    ]);

    application.put(`${this.basePath}/:id/contatos`, [
      this.validateId,
      this.replaceContatos,
    ]);
  }
}

export const empresasRouter = new EmpresasRouter();
