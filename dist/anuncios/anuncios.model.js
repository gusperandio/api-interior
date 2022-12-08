"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anuncios = void 0;
const mongoose = require("mongoose");
const horarioSchema = new mongoose.Schema({
    segunda: {
        type: [String],
        required: true,
    },
    terca: {
        type: [String],
        required: true,
    },
    quarta: {
        type: [String],
        required: true,
    },
    quinta: {
        type: [String],
        required: true,
    },
    sexta: {
        type: [String],
        required: true,
    },
    sabado: {
        type: [String],
        required: true,
    },
    domingo: {
        type: [String],
        required: true,
    },
    feriados: {
        type: [String],
        required: true,
    }
});
const anuncioSchema = new mongoose.Schema({
    tituloAd: {
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
        required: false,
        unique: true
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
    cepAd: {
        type: String,
        required: true,
    },
    numeroAd: {
        type: Number,
        required: true,
    },
    complementoAd: {
        type: String,
        required: false,
    },
    enderecoAd: {
        type: String,
        required: true,
    },
    bairroAd: {
        type: String,
        required: true,
    },
    cidadeAd: {
        type: String,
        required: true,
    },
    estadoAd: {
        type: String,
        required: true,
    },
    celularAd: {
        type: String,
        required: false,
    },
    telefoneAd: {
        type: String,
        required: false,
    },
    ramo: {
        type: String,
        required: true,
    },
    descricaoAd: {
        type: String,
        required: true,
        maxlength: 500,
        minlength: 99,
    },
    views: {
        type: Number,
        required: false
    },
    horarios: {
        type: [horarioSchema],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Anuncios = mongoose.model("Anuncio", anuncioSchema);
