import { Request, Response } from "express";
import { IContactCreateRequest, IContactUpdate } from "../interfaces/contacts";
import createContactService from "../services/contact/createContact.service"
import selectContactService from "../services/contact/selectContact.service"
import updateContactService from "../services/contact/updateContact.service"
import deleteContactService from "../services/contact/deleteContact.service"
import AppError from "../errors/appError";


const createContactController = async (req: Request, resp: Response) => {
    const dataReq: IContactCreateRequest = req.body;
    const dataResp = await createContactService(dataReq);
    return resp.status(201).json(dataResp);
  };

const getContactController = async (req: Request, resp: Response) => {
  const ContactId = req.auth.contactId;
  if (!ContactId){
    throw new AppError('message: Not found', 404)
  }
  const dataResp = await selectContactService(ContactId);
  return resp.status(200).json(dataResp);
};

const updateContactController = async (req:Request, resp:Response) =>{
  const ContactId = req.auth.contactId;
  if (!ContactId){
    throw new AppError('message: Not found', 404)
  }
  const ContactData:IContactUpdate = req.body
  const dataResp = await updateContactService(ContactData, ContactId)
  return resp.status(200).json(dataResp)
  }

const deleteContactController = async (req:Request, resp:Response) =>{
  const ContactId = req.auth.contactId;
  if (!ContactId){
    throw new AppError('message: Not found', 404)
  }
  const dataResp = await deleteContactService(ContactId)
  return resp.status(204).json(dataResp)
  }

export {
  createContactController, 
  getContactController, 
  updateContactController, 
  deleteContactController,
  }