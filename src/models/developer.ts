import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { default as Interface } from "../interfaces/developer";
import { BDConnection } from "../config/databaseTeste";

const developerSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      default: null,
    },
    sex: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    hobby: {
      type: String,
      default: null,
    },
    birthdate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const db = BDConnection();
export default db.models.desenvolvedor ||
  db.model("desenvolvedor", developerSchema);
