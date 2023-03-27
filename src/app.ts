import "reflect-metadata";
import express from "express";
import 'express-async-errors'
import handleError from './errors/handleError'
import clientRoutes from "./routes/client.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();
app.use(express.json());
app.use("/clients", clientRoutes);
app.use("/contacts", contactRoutes);

app.use(handleError)

export default app;