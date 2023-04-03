import { IContactCreateRequest, IContactResponse } from "../../interfaces/contacts";
import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import { createContactResponseSerializer } from "../../serializers/contacts.serializes";
import  AppError from "../../errors/appError";

const createContactService = async ( contactDataReq: IContactCreateRequest): Promise<IContactResponse> => {

  const contactModel = AppDataSource.getRepository(Contact);
  const checkIfEmailOrNameExists = await contactModel.findOneBy(
    [
    {email: contactDataReq.email},
    {name: contactDataReq.name}
    ]
  );
  if(checkIfEmailOrNameExists){
    const values = Object.values(checkIfEmailOrNameExists);
    values.forEach((value) => 
      { 
        if(value==contactDataReq.email){
        throw new AppError("Email already exists", 409);
        }
      })
      throw new AppError("Name already exists", 409);
  }

  const contactInstance = contactModel.create(contactDataReq);
  await contactModel.save(contactInstance);

  try {
    const createContactDataResp = await createContactResponseSerializer.validate(contactInstance, {
      abortEarly: true,
      stripUnknown: true
  })
    return {data: createContactDataResp, message:"Criado com sucesso"}
    
  } catch (err: any) {
    throw new AppError(err.errors)
  }
};

export default createContactService;
