import mongoose from "mongoose";
let db: any;

export function BDConnection(): mongoose.Connection {
  if (!db) {
    mongoose.set("useUnifiedTopology", true);
    db = mongoose
      .createConnection(
        "mongodb://docker:docker@localhost:27017/developer-felipe?authSource=admin",
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }
      )
      .on("connected", (): void => {
        console.log("Connected to the database");
      });
  }

  return db;
}
