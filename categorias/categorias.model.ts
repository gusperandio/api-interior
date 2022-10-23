import * as mongoose from "mongoose";

export interface SubCategorias extends mongoose.Document {
  nome: string;
  descricao: string;
  dtSubCategorias: string;
}

export interface Categorias extends mongoose.Document {
  nome: string;
  descricao: string;
  dtCategoria: string;
  subcategoria: SubCategorias[];
}

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

export const Categorias = mongoose.model<Categorias>(
  "Categoria",
  categoriaSchema
);
