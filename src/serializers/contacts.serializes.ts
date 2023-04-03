import { IContactCreateRequest, IContact, IContactUpdate, IContactResponseUpdate } from "../interfaces/contacts"
import * as yup from "yup";
import { SchemaOf } from "yup";
import { createClientResponseSerializer } from "./clients.serializers";

const createContactSerializer: SchemaOf<IContactCreateRequest> = yup.object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    password: yup.string().required(),
  });

const createContactResponseSerializer: SchemaOf<IContact> = yup.object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    createdAt: yup.date().required(),
  });

const updateContactSerializer: SchemaOf<IContactUpdate> = yup.object()
  .shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    telephone: yup.string().notRequired(),
    password: yup.string().notRequired(),
  })

const updateResponseContactSerializer: SchemaOf<IContactResponseUpdate> = yup.object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    createdAt: yup.date().required(),
  })

export { createContactSerializer, createContactResponseSerializer, updateContactSerializer, updateResponseContactSerializer };