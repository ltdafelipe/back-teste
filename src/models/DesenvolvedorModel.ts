import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import DesenvolvedorInterface from "../interfaces/DesenvolvedorInterface";
import { conectaBancoDados } from "./../config/databaseTeste";

const DesenvolvedorSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    nome: {
      type: String,
      default: null,
    },
    sexo: {
      type: String,
      default: null,
    },
    idade: {
      type: Number,
      default: null,
    },
    hobby: {
      type: String,
      default: null,
    },
    datanascimento: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm",
    },
  }
);

const db = conectaBancoDados()
export default db.models.desenvolvedor || db.model<DesenvolvedorInterface>('desenvolvedor', DesenvolvedorSchema)
