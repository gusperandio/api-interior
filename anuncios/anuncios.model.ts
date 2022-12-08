import { User } from './../users/users.model';
import * as mongoose from "mongoose";

export interface Precos extends mongoose.Document {
  preco1 : number;
  preco2 : number;
  preco3 : number;
  preco4 : number;
  preco5 : number;
}

export interface Horarios extends mongoose.Document {
  segunda: string[];
  terca: string[];
  quarta: string[];
  quinta: string[];
  sexta: string[];
  sabado: string[];
  domingo: string[];
  feriados: string[];
}

export interface Anuncios extends mongoose.Document {
  tituloAd: string;
  responsavel: string;
  fantasia: string;
  cnpj: string;
  dataAb: string;
  cnae: string;
  situacao: string;
  natureza: string;
  cepAd: string;
  numeroAd: number;
  complementoAd: string;
  enderecoAd: string;
  bairroAd: string;
  cidadeAd: string;
  estadoAd: string;
  celularAd: string;
  telefoneAd: string;
  ramo: string;
  descricaoAd: string;
  views: number;
  horarios: Horarios[];
  userId: mongoose.Types.ObjectId | User
}

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
})

const anuncioSchema = new mongoose.Schema({
  tituloAd: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
  responsavel:{
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
  views:{
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

export const Anuncios = mongoose.model<Anuncios>(
  "Anuncio",
  anuncioSchema
);
