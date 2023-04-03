import { IClientCreateRequest, IClient, IClientUpdate } from "../interfaces/clients"
import * as yup from "yup";
import { SchemaOf } from "yup";

const createClientSerializer: SchemaOf<IClientCreateRequest> = yup.object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    password: yup.string().required(),
  });

const createClientResponseSerializer: SchemaOf<IClient> = yup.object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    createdAt: yup.date().required(),
  });

const clientUpdateSerializer: SchemaOf<IClientUpdate> = yup.object()
  .shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    telephone: yup.string().notRequired(),
    password: yup.string().notRequired(),
  })

export { createClientSerializer, createClientResponseSerializer, clientUpdateSerializer };