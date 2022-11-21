"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
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
    responsavel: {
        type: String,
        required: true
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
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    numberRecovery: {
        type: Number,
        required: false
    }
});
empresaSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection);
};
empresaSchema.statics.findByCnpj = function (cnpj, projection) {
    return this.findOne({ cnpj }, projection);
};
empresaSchema.methods.matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
empresaSchema.methods.hasAny = function (...profiles) {
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
    const empresa = this;
    if (!empresa.isModified("password")) {
        next();
    }
    else {
        hashPassword(empresa, next);
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
empresaSchema.pre("save", saveMiddleware);
empresaSchema.pre("findOneAndUpdate", updateMiddleware);
empresaSchema.pre("update", updateMiddleware);
exports.Empresa = mongoose.model("Empresa", empresaSchema);
