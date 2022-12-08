import { Vagas } from "./../vagas/vagas.model";
import * as mongoose from "mongoose";
import { validateCPF } from "../common/validators";
import * as bcrypt from "bcrypt";
import { environment } from "../common/environment";



export interface Notificacao extends mongoose.Document {
  TituloNotif: string;
  dataNotif: string;
  subNotif1: string;
  subNotif2: string;
  subNotif3: string;
  horaNotif: string;
}

export interface Formacao extends mongoose.Document {
  instituicao: string;
  curso: string;
  nivel: string;
  situacao: string;
}

export interface Experiencia extends mongoose.Document {
  empresa: string;
  cargo: string;
  dtInicio: string;
  dtFinal: string;
  atual: boolean;
  descricao: string;
}

export interface Curso extends mongoose.Document {
  nome: string;
  instituicao: string;
}

export interface Idioma extends mongoose.Document {
  idioma: string;
  nivel: string;
}

export interface Candidaturas extends mongoose.Document {
  dtCandidatura: string;
  aprovado: boolean;
  recusado: boolean;
  entrevista: string;
  vagaId: mongoose.Types.ObjectId | Vagas;
}

export interface User extends mongoose.Document {
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  dataNasc: string;
  genero: string;
  estadoCivil: string;
  password: string;
  profiles: string[];
  cep: string;
  numero: number;
  complemento: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  celular: string;
  celRecado: string;
  telefone: string;
  instagram: string;
  linkedin: string;
  formacaoEdu: Formacao[];
  expProfissional: Experiencia[];
  cursos: Curso[];
  idiomas: Idioma[];
  candidaturas: Candidaturas[];
  notificacao: Notificacao[]
  descricaoUser: string;
  numberRecovery: number;
  curriculo: boolean;
  matches(password: string): boolean;
  hasAny(...profiles: string[]): boolean;
  //hasAny('admin', 'user')
}

export interface UserModel extends mongoose.Model<User> {
  findByEmail(email: string, projection?: string): Promise<User>;
} //todo COLOCAR ? DEMONSTRA QUE É OPCIONAL

export interface UserModel extends mongoose.Model<User> {
  findByCpf(cpf: string, projection?: string): Promise<User>;
}

//* SELECT = Se será exibido esse campo
//* REQUIRED = Se é obrigatório informar esse campo
//* MAXLENGTH = Quantidade máxima de caracteres
//* MINLENGTH = Quantidade mínima de caracteres
//* ENUM = Só aceita os valores que forem passados
//* MATCH = Expressão regular para validar o que foi recebido
//* VALIDATE = Posso criar uma função ou um objeto para verificar


const notificacaoSchema = new mongoose.Schema({
  TituloNotif: {
    type: String,
    required: true,
  },
  dataNotif: {
    type: String,
    required: true,
  },
  subNotif1: {
    type: String,
    required: false,
  },
  subNotif2: {
    type: String,
    required: false,
  },
  subNotif3: {
    type: String,
    required: false,
  },
  horaNotif: {
    type: String,
    required: true,
  },
});

const formacaoSchema = new mongoose.Schema({
  instituicao: {
    type: String,
    required: true,
  },
  curso: {
    type: String,
    required: false,
  },
  nivel: {
    type: String,
    required: true,
  },
  situacao: {
    type: String,
    required: true,
  },
});



const expSchema = new mongoose.Schema({
  empresa: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  dtInicio: {
    type: String,
    required: false,
  },
  dtFinal: {
    type: String,
    required: false,
  },
  atual: {
    type: Boolean,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});

const cursosSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  instituicao: {
    type: String,
    required: true,
  },
});

const idiomasSchema = new mongoose.Schema({
  idioma: {
    type: String,
    required: true,
  },
  nivel: {
    type: String,
    required: true,
  },
  bandeira: {
    type: String,
    required: true,
  },
});

const candidaturasSchema = new mongoose.Schema({
  dtCandidatura: {
    type: String,
    required: true,
  },
  aprovado: {
    type: Boolean,
    required: true,
  },
  recusado: {
    type: Boolean,
    required: true,
  },
  entrevista: {
    type: String,
    required: true,
  },
  vagaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vagas",
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
  sobrenome: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
  rg: {
    type: String,
    required: false,
    maxlength: 14,
    minlength: 3,
  },
  cpf: {
    type: String,
    required: false,
    validate: {
      validator: validateCPF,
      message: "{PATH}: Invalid CPF ({VALUE})",
    },
  },
  email: {
    type: String,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  dataNasc: {
    type: String,
    required: false,
  },
  genero: {
    type: String,
    required: false,
    enum: ["Masculino", "Feminino", "Outros", "Não informado"],
  },
  estadoCivil: {
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
    required: true,
  },
  cep: {
    type: String,
    required: false,
  },
  numero: {
    type: Number,
    required: false,
  },
  complemento: {
    type: String,
    required: false,
  },
  endereco: {
    type: String,
    required: false,
  },
  bairro: {
    type: String,
    required: false,
  },
  cidade: {
    type: String,
    required: false,
  },
  estado: {
    type: String,
    required: false,
  },
  celular: {
    type: String,
    required: true,
    unique: true
  },
  celRecado: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  formacaoEdu: {
    type: [formacaoSchema],
    required: false,
  },
  expProfissional: {
    type: [expSchema],
    required: false,
  },
  cursos: {
    type: [cursosSchema],
    required: false,
  },
  idiomas: {
    type: [idiomasSchema],
    required: false,
  },
  notificacao:{
    type: [notificacaoSchema],
    required: false
  },
  descricaoUser: {
    type: String,
    required: false,
    maxlength: 500,
    minlength: 50,
  },
  candidaturas: {
    type: [candidaturasSchema],
    required: false,
  },
  numberRecovery: {
    type: Number,
    required: false,
  },
  curriculo: {
    type: Boolean,
    required: true,
  },
});

userSchema.statics.findByEmail = function (email: string, projection: string) {
  return this.findOne({ email }, projection);
};

userSchema.statics.findByCpf = function (cpf: string, projection: string) {
  return this.findOne({ cpf }, projection);
};

userSchema.methods.matches = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hasAny = function (...profiles: string[]): boolean {
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
  const user: User = this;
  if (!user.isModified("password")) {
    next();
  } else {
    hashPassword(user, next);
  }
};

const updateMiddleware = function (next) {
  if (!this.getUpdate().password) {
    next();
  } else {
    hashPassword(this.getUpdate(), next);
  }
};

userSchema.pre("save", saveMiddleware);

userSchema.pre("findOneAndUpdate", updateMiddleware);

userSchema.pre("update", updateMiddleware);

export const User = mongoose.model<User, UserModel>("User", userSchema);
