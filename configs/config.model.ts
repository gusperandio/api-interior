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

export interface Configs extends mongoose.Document {
  categorias: Categorias[];
  salarioAtual: number;
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
    required: false,
  },
  descricao: {
    type: String,
    required: false,
  },
  dtCategoria: {
    type: String,
    required: false,
  },
  subcategoria: {
    type: [subCategoriaSchema],
    required: false,
  },
});

const configSchema = new mongoose.Schema({
  categorias: {
    type: [categoriaSchema],
    required: false,
  },
  salarioAtual: {
    type: String,
    required: false,
  }
});

export const Configs = mongoose.model<Configs>("Config", configSchema);
