import Client from "../../entities/client.entity";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { IClient } from "../../interfaces/clients"

const selectClientService = async (clientId: string) : Promise<IClient> =>{
    const clientModel = AppDataSource.getRepository(Client);
    const clientData = await clientModel.findOne({
        where:{
            id: clientId
        },
        select:{
            name:true,
            email:true,
            createdAt:true,
            id:true,
            telephone:true,
        }
     })
    if(!clientData){
        throw new AppError ('Not found or empty', 404)
    }
    return clientData
}

export default selectClientService
