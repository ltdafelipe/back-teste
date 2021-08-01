import express, { Application } from "express";
import routes from "./routes/developer";
import cors from "cors";

class Server {
  public server: Application;

  constructor() {
    this.server = express();

    this.setup();
  }

  private setup(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use("/", routes);
    this.server.enable("trust proxy");
  }

  public listen(): void {
    console.log('API ONLINE')
  }


}

export default () => new Server()