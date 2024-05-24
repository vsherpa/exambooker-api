import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {x} from "./dynamic-functions";
import {auth } from 'express-oauth2-jwt-bearer';
import {ApiPermissions} from "./middleware/api-permissions";
import {checkPermissions} from "./middleware/permissions";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.get("/range", jwtCheck, checkPermissions(ApiPermissions.ReadRange), (req: Request, res: Response) => {
  res.send(x.toString());
});


app.listen(port, () => {
  console.log(`[server]:Server is running at http://localhost:${port}`);
});