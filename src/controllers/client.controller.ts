import { Request, Response } from "express";
import { IClientCreateRequest, IClientUpdate } from "../interfaces/clients";
import createClientService from "../services/client/createClient.service"
import selectClientService from "../services/client/selectClient.service"
import updateClientService from "../services/client/updateClient.service"
import deleteClientService from "../services/client/deleteClient.service"
import addContactOnClientService from "../services/client/addContactOnClient.service";
import listClientContactsService from "../services/client/listClientContacts.service"
import showContactsLeftService from "../services/client/showContactsLeft.service";
import AppError from "../errors/appError";

const createClientController = async (req: Request, resp: Response) => {
    const dataReq: IClientCreateRequest = req.body;
    const dataResp = await createClientService(dataReq);
    return resp.status(201).json(dataResp);
  };

const getClientController = async (req: Request, resp: Response) => {
  const clientId = req.auth.clientId;
  if (!clientId){
    throw new AppError('Unauthorized', 203)
  }
  const dataResp = await selectClientService(clientId);
  return resp.status(200).json(dataResp);
};

const updateClientController = async (req:Request, resp:Response) =>{
  const clientId = req.auth.clientId
  if (!clientId){
    throw new AppError('Unauthorized', 203)
  }
  const clientData:IClientUpdate = req.body
  const dataResp = await updateClientService(clientData, clientId)
  return resp.status(200).json(dataResp)
  }

const deleteClientController = async (req:Request, resp:Response) =>{
  const clientId = req.auth.clientId
  if (!clientId){
    throw new AppError('Unauthorized', 203)
  }
  const dataResp = await deleteClientService(clientId)
  return resp.status(204).json(dataResp)
  }

const listClientContactsController = async (req:Request, resp:Response) =>{
  const clientId = req.auth.clientId;
  if (!clientId){
    throw new AppError('Unauthorized', 203)
  }
  const dataResp = await listClientContactsService(clientId)
  return resp.status(200).json(dataResp);
}

const addContactOnClientController = async (req:Request, resp:Response) =>{
  const contactName = req.params.contactName;
  const clientId = req.auth.clientId;
  if (!clientId){
    throw new AppError('Unauthorized', 203)
  }
  const dataResp = await addContactOnClientService(contactName, clientId)
  return resp.status(200).json(dataResp);
}

const showContactsLeftController = async (req:Request, resp:Response) =>{
  const clientId = req.auth.clientId;
  if (!clientId){
    throw new AppError('Unauthorized', 203)
  }
  const dataResp = await showContactsLeftService()
  return resp.status(200).json(dataResp);
}


export {
  createClientController, 
  getClientController, 
  updateClientController, 
  deleteClientController,
  listClientContactsController,
  addContactOnClientController,
  showContactsLeftController
  }