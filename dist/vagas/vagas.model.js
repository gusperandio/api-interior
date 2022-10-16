"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vagas = void 0;
const mongoose = require("mongoose");
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    empresaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true,
    }
});
const vagasSchema = new mongoose.Schema({
    dtPub: {
        type: String,
        required: true,
    },
    nomeEmpresa: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    tituloVaga: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    contrato: {
        type: String,
        required: true,
    },
    prazo: {
        type: String,
        required: true,
    },
    horario: {
        type: Number,
        required: true,
    },
    combinado: {
        type: Boolean,
        required: true,
    },
    salario: {
        type: Number,
        required: true,
    },
    qualificacao: {
        type: String,
        required: true,
    },
    alimentacao: {
        type: String,
        required: false,
    },
    medica: {
        type: String,
        required: true,
    },
    qtde: {
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    msgEntrevista: {
        type: String,
        required: true,
    },
    beneficios: {
        type: [String],
        required: false,
        defaul: [],
    },
    congelada: {
        type: Boolean,
        required: true,
    },
    online: {
        type: Boolean,
        required: true,
    },
    empresaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true,
    },
    candidaturas: {
        type: [candidaturasSchema],
        required: false
    }
});
exports.Vagas = mongoose.model("Vaga", vagasSchema);
