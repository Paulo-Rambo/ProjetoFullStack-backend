import { IClientCreateRequest, IClientResponse } from "../../interfaces/clients";
import Client from "../../entities/client.entity";
import AppDataSource from "../../data-source";
import { createClientResponseSerializer } from "../../serializers/clients.serializers";
import  AppError  from "../../errors/appError";

const createClientService = async ( clientDataReq: IClientCreateRequest): Promise<IClientResponse> => {

  const clientModel = AppDataSource.getRepository(Client);
  const checkIfEmailOrNameExists = await clientModel.findOneBy(
      [
      {email: clientDataReq.email},
      {name: clientDataReq.name}
      ]
    );

  if(checkIfEmailOrNameExists){
    const values = Object.values(checkIfEmailOrNameExists);
    values.forEach((value) => 
      { 
        if(value==clientDataReq.email){
        throw new AppError("Email already exists", 409);
        }
      })
      throw new AppError("Name already exists", 409);
  }


  const clientInstance = clientModel.create(clientDataReq);
  await clientModel.save(clientInstance);

  try {
    const createClientDataResp = await createClientResponseSerializer.validate(clientInstance, {
      abortEarly: true,
      stripUnknown: true
  })
    return {data: createClientDataResp, message: "Criado com sucesso"}
    
  } catch (err: any) {
    throw new AppError(err.errors)
  }
};

export default createClientService;
