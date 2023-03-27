import { IContactCreateRequest, IContactResponse, IContactUpdate, IContactResponseUpdate } from "../interfaces/contacts"
import * as yup from "yup";
import { SchemaOf } from "yup";

const createContactSerializer: SchemaOf<IContactCreateRequest> = yup.object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    clientsId: yup.string().required()
  });

const createContactResponseSerializer: SchemaOf<IContactResponse> = yup.object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    createdAt: yup.date().required(),
    clientsId: yup.string().required(),
  });


const updateContactSerializer: SchemaOf<IContactUpdate> = yup.object()
  .shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
    clientsId: yup.string().notRequired()
  })

const updateResponseContactSerializer: SchemaOf<IContactResponseUpdate> = yup.object()
  .shape({
    id: yup.string().required(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    clientsId: yup.string().notRequired(),
    createdAt: yup.date().required(),
  })

export { createContactSerializer, createContactResponseSerializer, updateContactSerializer, updateResponseContactSerializer };