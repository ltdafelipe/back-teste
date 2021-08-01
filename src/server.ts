import App from "./app";
import http from "http";

const app = App();

http.createServer(app.server).listen(4000, app.listen);
