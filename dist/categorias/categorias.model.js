"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorias = void 0;
const mongoose = require("mongoose");
const subCategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    dtSubCategorias: {
        type: String,
        required: true,
    },
});
const categoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    dtCategoria: {
        type: String,
        required: true,
    },
    subcategoria: {
        type: [subCategoriaSchema],
        required: false,
    },
});
exports.Categorias = mongoose.model("Categoria", categoriaSchema);
