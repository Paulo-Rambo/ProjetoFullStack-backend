import AppDataSource from "../../data-source"
import Client from "../../entities/client.entity";
import AppError from "../../errors/appError";


const deleteClientService = async (clientId:string) =>{

    const clientModel = AppDataSource.getRepository(Client);
    const clientData = await clientModel.findOneBy(
        {
            id: clientId
        }
    );
    
    if (!clientData){
        throw new AppError ('Not found', 404)
    }


    await clientModel.remove(clientData)

   
    return {message: "client deleted."}
}

export default deleteClientService;