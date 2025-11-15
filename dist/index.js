import { httpServer } from "./http_server/index.js";
import './ws_server/index.ts';
var HTTP_PORT = 8181;
console.log("Start static http server on the ".concat(HTTP_PORT, " port!"));
httpServer.listen(HTTP_PORT);
