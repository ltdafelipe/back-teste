import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { default as Interface } from "../interfaces/developer";
import { BDConnection } from "../config/databaseDeveloper";

const developerSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true
    },
    name: {
      type: String,
      default: null,
      required: [true, "Nome obrigatório"]
    },
    sex: {
      type: String,
      default: null,
      required: [true, "Sexo obrigatório"]
    },
    age: {
      type: Number,
      min: 1,
      max: 100,
      default: null,
      required: [true, "Idade obrigatório"]
    },
    hobby: {
      type: String,
      default: null,
      required: [true, "Hobby obrigatório"]
    },
    birthdate: {
      type: Date,
      default: null,
      required: [true, "Data de nascimento obrigatório"]
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    },
  }
);

const db = BDConnection();
export default db.models.developer || db.model("developer", developerSchema);
