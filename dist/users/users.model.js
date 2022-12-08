"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
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
            validator: validators_1.validateCPF,
            message: "{PATH}: Invalid CPF ({VALUE})",
        },
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    notificacao: {
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
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection);
};
userSchema.statics.findByCpf = function (cpf, projection) {
    return this.findOne({ cpf }, projection);
};
userSchema.methods.matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.hasAny = function (...profiles) {
    return profiles.some((profile) => this.profiles.indexOf(profile) !== -1);
};
const hashPassword = (obj, next) => {
    //todo O segundo parametro SALTROUNDS é um numero inteiro, faz a criptografia pela quantidade passada, nesse exemplo, criptografa 10 vezes
    bcrypt
        .hash(obj.password, environment_1.environment.security.saltRounds)
        .then((hash) => {
        obj.password = hash;
        next();
    })
        .catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre("save", saveMiddleware);
userSchema.pre("findOneAndUpdate", updateMiddleware);
userSchema.pre("update", updateMiddleware);
exports.User = mongoose.model("User", userSchema);
