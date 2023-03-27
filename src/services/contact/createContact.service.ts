import { IContactCreateRequest, IContactResponse } from "../../interfaces/contacts";
import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import { createContactResponseSerializer } from "../../serializers/contacts.serializes";
import  AppError from "../../errors/appError";
import Client from "../../entities/client.entity"

const createContactService = async ( contactDataReq: IContactCreateRequest): Promise<IContactResponse> => {

  const contactModel = AppDataSource.getRepository(Contact);
  const checkIfEmailExists = await contactModel.findOneBy({
      email: contactDataReq.email,
    });
  if(checkIfEmailExists) {
    throw new AppError("Email already exists", 409);
  }

  const clientModel = AppDataSource.getRepository(Client);
  const findClient = await clientModel.findOneBy({
    id: contactDataReq.clientsId,
    });
  if(!findClient) {
    throw new AppError("Client not found", 404);
  }

  const newContact = {...contactDataReq, clients:findClient}
  const contactInstance = contactModel.create(newContact);
  await contactModel.save(contactInstance);

  contactInstance.clientsId = contactDataReq.clientsId

  try {
    const createContactDataResp = await createContactResponseSerializer.validate(contactInstance, {
      abortEarly: true,
      stripUnknown: true
  })
    return createContactDataResp
    
  } catch (err: any) {
    throw new AppError(err.errors)
  }
};

export default createContactService;
