import * as mongoose from "mongoose";
import { validateCPF } from "../common/validators";
import * as bcrypt from "bcrypt";
import { environment } from "../common/environment";

export interface Contatos extends mongoose.Document {
  tipo: string;
  contato: string;
  validado: boolean;
}

export interface Empresa extends mongoose.Document {
  nomeEmpresa: string;
  fantasia: string;
  cnpj: string;
  email: string;
  dataAb: string;
  cnae: string;
  situacao: string;
  natureza: string;
  password: string;
  profiles: string[];
  cep: string;
  numero: number;
  complemento: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  contatos: Contatos[];
  ramo: string;
  descricaoEmpresa: string;
  aceita: boolean;
  recusada: boolean;
  numberRecovery: number;
  matches(password: string): boolean;
  hasAny(...profiles: string[]): boolean;
}

export interface EmpresaModel extends mongoose.Model<Empresa> {
  findByEmail(email: string, projection?: string): Promise<Empresa>;
} //todo COLOCAR ? DEMONSTRA QUE É OPCIONAL

export interface EmpresaModel extends mongoose.Model<Empresa> {
  findByCnpj(cnpj: string, projection?: string): Promise<Empresa>;
}

const contatosSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
  },
  contato: {
    type: String,
    required: true,
  },
  validado: {
    type: Boolean,
    required: true,
  },
});

const empresaSchema = new mongoose.Schema({
  nomeEmpresa: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
  fantasia: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1,
  },
  cnpj: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  dataAb: {
    type: String,
  },
  cnae: {
    type: String,
    required: false,
  },
  situacao: {
    type: String,
    required: false,
  },
  natureza: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  profiles: {
    type: [String],
    required: false,
  },
  cep: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  complemento: {
    type: String,
    required: false,
  },
  endereco: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  contatos: {
    type: [contatosSchema],
    required: true,
  },
  ramo: {
    type: String,
    required: true,
  },
  descricaoEmpresa: {
    type: String,
    required: true,
    maxlength: 500,
    minlength: 99,
  },
  aceita: {
    type: Boolean,
    required: true,
  },
  recusada: {
    type: Boolean,
    required: true,
  },
  numberRecovery:{
    type: Number,
    required: false
  }
});

empresaSchema.statics.findByEmail = function (
  email: string,
  projection: string
) {
  return this.findOne({ email }, projection);
};

empresaSchema.statics.findByCnpj = function (cnpj: string, projection: string) {
  return this.findOne({ cnpj }, projection);
};

empresaSchema.methods.matches = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

empresaSchema.methods.hasAny = function (...profiles: string[]): boolean {
  return profiles.some((profile) => this.profiles.indexOf(profile) !== -1);
};

const hashPassword = (obj, next) => {
  //todo O segundo parametro SALTROUNDS é um numero inteiro, faz a criptografia pela quantidade passada, nesse exemplo, criptografa 10 vezes
  bcrypt
    .hash(obj.password, environment.security.saltRounds)
    .then((hash) => {
      obj.password = hash;
      next();
    })
    .catch(next);
};

const saveMiddleware = function (next) {
  const empresa: Empresa = this;
  if (!empresa.isModified("password")) {
    next();
  } else {
    hashPassword(empresa, next);
  }
};

const updateMiddleware = function (next) {
  if (!this.getUpdate().password) {
    next();
  } else {
    hashPassword(this.getUpdate(), next);
  }
};

empresaSchema.pre("save", saveMiddleware);

empresaSchema.pre("findOneAndUpdate", updateMiddleware);

empresaSchema.pre("update", updateMiddleware);

export const Empresa = mongoose.model<Empresa, EmpresaModel>(
  "Empresa",
  empresaSchema
);
