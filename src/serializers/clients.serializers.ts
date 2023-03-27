import { IClientCreateRequest, IClientResponse, IClientUpdate } from "../interfaces/clients"
import * as yup from "yup";
import { SchemaOf } from "yup";

const createClientSerializer: SchemaOf<IClientCreateRequest> = yup.object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

const createClientResponseSerializer: SchemaOf<IClientResponse> = yup.object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    createdAt: yup.date().required(),
  });

const clientUpdateSerializer: SchemaOf<IClientUpdate> = yup.object()
  .shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
  })

export { createClientSerializer, createClientResponseSerializer, clientUpdateSerializer };