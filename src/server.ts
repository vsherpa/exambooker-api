import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {x} from "./dynamic-functions";
import {auth} from "express-oauth2-jwt-bearer";
import {checkPermissions} from "../middleware/permissions";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3002;

const jwtCheck = auth({
  audience: 'https://exambooker/api',
  issuerBaseURL: 'https://exam-booker-app.eu.auth0.com/',
  tokenSigningAlg: 'RS256',
  jwksUri: 'https://exam-booker-app.eu.auth0.com/.well-known/jwks.json',
});

// enforce on all endpoints
app.use(jwtCheck);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/*app.get("/range",  [jwtCheck, checkPermissions("read:range")], (req: Request, res: Response) => {
  res.send(x.toString());
});*/

app.get("/range", (req: Request, res: Response) => {
  res.send(x.toString());
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});