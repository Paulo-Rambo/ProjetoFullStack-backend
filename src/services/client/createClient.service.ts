import { IClientCreateRequest, IClientResponse } from "../../interfaces/clients";
import Client from "../../entities/client.entity";
import AppDataSource from "../../data-source";
import { createClientResponseSerializer } from "../../serializers/clients.serializers";
import  AppError  from "../../errors/appError";

const createClientService = async ( clientDataReq: IClientCreateRequest): Promise<IClientResponse> => {

  const clientModel = AppDataSource.getRepository(Client);
  const checkIfEmailExists = await clientModel.findOneBy({
      email: clientDataReq.email,
    });
  if(checkIfEmailExists) {
    throw new AppError("Email already exists", 409);
  }
  const clientInstance = clientModel.create(clientDataReq);
  await clientModel.save(clientInstance);

  try {
    const createClientDataResp = await createClientResponseSerializer.validate(clientInstance, {
      abortEarly: true,
      stripUnknown: true
  })
    return createClientDataResp
    
  } catch (err: any) {
    throw new AppError(err.errors)
  }
};

export default createClientService;
