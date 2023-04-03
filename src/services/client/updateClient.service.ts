import Client from "../../entities/client.entity";
import AppDataSource from "../../data-source";
import 'dotenv/config'
import AppError from "../../errors/appError";
import { IClientUpdate } from "../../interfaces/clients";
import { createClientResponseSerializer } from "../../serializers/clients.serializers";
import { IClientResponse } from "../../interfaces/clients";

const updateClientService = async (clientData:IClientUpdate, clientId: string): Promise<IClientResponse> => {

    const clientModel = AppDataSource.getRepository(Client);
  
    const checkIfEmailExists = await clientModel.findOneBy({
        email: clientData.email,
    });
    if(clientData.email && checkIfEmailExists) {
      throw new AppError("Email already exists", 409);
    };

    const checkIfNameExists = await clientModel.findOneBy({
        name: clientData.name,
    });
    if(clientData.name && checkIfNameExists) {
      throw new AppError("Name already exists", 409);
    };

    const clientDataQuery = await clientModel.findOneBy(
      {
        id: clientId
      }
    );
    if(!clientDataQuery){
        throw new AppError ('Client not found', 404)
    };
    
    const updateClient = clientModel.create({
        ...clientDataQuery, ...clientData
    });

    await clientModel.save(updateClient)

    try {
        const updateClientDataResp = await createClientResponseSerializer.validate(updateClient, {
          abortEarly: true,
          stripUnknown: true
      });
        return {data: updateClientDataResp, message: "Atualizado com sucesso!"}
        
    } catch (err: any) {
        throw new AppError(err.errors)
    };
}

export default updateClientService