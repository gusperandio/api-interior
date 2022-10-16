import { verificaCPF, verificaEmail } from './../security/auth.handler';
import { Vagas } from "./../vagas/vagas.model";
import { NotFoundError } from "restify-errors";
import { authorize } from "./../security/authz.handler";
import * as restify from "restify";
import { User } from "./users.model";
import { ModelRouter } from "../common/model-router";
import { authenticate } from "../security/auth.handler";
import * as mongoose from "mongoose";

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User);
    this.on("beforeRender", (document) => {
      document.password = undefined;
      //delete document.password
    });
  }

  protected prepareOne(
    query: mongoose.Query<User, User>
  ): mongoose.Query<User, User> {
    return query
      .populate("candidaturas", ["tituloVaga"])
  }

  findByEmail = (req, resp, next) => {
    if (req.query.email) {
      User.findByEmail(req.query.email)
        .then((user) => (user ? [user] : []))
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
    User.findById(req.params.id, "+contatos")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          resp.json(rest.contatos);
          return next();
        }
      })
      .catch(next);
  };

  findFormacoes = (req, resp, next) => {
    User.findById(req.params.id, "+formacaoEdu")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          resp.json(rest.formacaoEdu);
          return next();
        }
      })
      .catch(next);
  };

  findExps = (req, resp, next) => {
    User.findById(req.params.id, "+expProfissional")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          resp.json(rest.expProfissional);
          return next();
        }
      })
      .catch(next);
  };

  findCursos = (req, resp, next) => {
    User.findById(req.params.id, "+cursos")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          resp.json(rest.cursos);
          return next();
        }
      })
      .catch(next);
  };

  findIdiomas = (req, resp, next) => {
    User.findById(req.params.id, "+idiomas")
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          resp.json(rest.idiomas);
          return next();
        }
      })
      .catch(next);
  };

   findCandidaturas = (req, resp, next) => {
     User.findById(req.params.id, "+candidaturas").populate({ path: 'candidaturas.vagaId', model: 'Vaga'})
       .then((rest) => {
         if (!rest) {
           throw new NotFoundError("Usuário não existe");
         } else {
           resp.json(rest.candidaturas);
           return next();
         }
       })
       .catch(next);
   };

  replaceContatos = (req, resp, next) => {
    User.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
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

  replaceFormacoes = (req, resp, next) => {
    User.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          rest.formacaoEdu = req.body; //Array de MenuItem
          return rest.save();
        }
      })
      .then((rest) => {
        resp.json(rest.formacaoEdu);
        return next();
      })
      .catch(next);
  };

  replaceExp = (req, resp, next) => {
    User.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          rest.expProfissional = req.body; //Array de MenuItem
          return rest.save();
        }
      })
      .then((rest) => {
        resp.json(rest.expProfissional);
        return next();
      })
      .catch(next);
  };

  replaceCursos = (req, resp, next) => {
    User.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          rest.cursos = req.body; //Array de MenuItem
          return rest.save();
        }
      })
      .then((rest) => {
        resp.json(rest.cursos);
        return next();
      })
      .catch(next);
  };

  replaceIdiomas = (req, resp, next) => {
    User.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
        } else {
          rest.idiomas = req.body; //Array de MenuItem
          return rest.save();
        }
      })
      .then((rest) => {
        resp.json(rest.idiomas);
        return next();
      })
      .catch(next);
  };

  replaceCandidaturas = (req, resp, next) => {
    User.findById(req.params.id)
      .then((rest) => {
        if (!rest) {
          throw new NotFoundError("Usuário não existe");
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

  applyRoutes(application: restify.Server) {
    application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
      this.findByEmail,
      this.findAll,
    ]);

    application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
    application.post(`${this.basePath}`, [this.save]);
    application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
    application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
    application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    application.post(`${this.basePath}/authenticate`, authenticate);
    application.post(`${this.basePath}/authenticateCPF`, verificaCPF);
    application.post(`${this.basePath}/authenticateEmail`, verificaEmail);

    application.get(`${this.basePath}/:id/contatos`, [
      this.validateId,
      this.findContatos,
    ]);
    application.get(`${this.basePath}/:id/formacaoEdu`, [
      this.validateId,
      this.findFormacoes,
    ]);
    application.get(`${this.basePath}/:id/expProfissional`, [
      this.validateId,
      this.findExps,
    ]);
    application.get(`${this.basePath}/:id/cursos`, [
      this.validateId,
      this.findCursos,
    ]);
    application.get(`${this.basePath}/:id/idiomas`, [
      this.validateId,
      this.findIdiomas,
    ]);
    application.get(`${this.basePath}/:id/candidaturas`, [
      this.validateId,
      this.findCandidaturas,
    ]);

    application.put(`${this.basePath}/:id/contatos`, [
      this.validateId,
      this.replaceContatos,
    ]);

    application.put(`${this.basePath}/:id/formacaoEdu`, [
      this.validateId,
      this.replaceFormacoes,
    ]);

    application.put(`${this.basePath}/:id/expProfissional`, [
      this.validateId,
      this.replaceExp,
    ]);

    application.put(`${this.basePath}/:id/cursos`, [
      this.validateId,
      this.replaceCursos,
    ]);

    application.put(`${this.basePath}/:id/idiomas`, [
      this.validateId,
      this.replaceIdiomas,
    ]);

    application.put(`${this.basePath}/:id/candidaturas`, [
      this.validateId,
      this.replaceCandidaturas,
    ]);
  }
}

export const usersRouter = new UsersRouter();
