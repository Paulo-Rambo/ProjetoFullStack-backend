import { IClientResponse } from "../../interfaces/clients";
import Client from "../../entities/client.entity";
import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import { createClientResponseSerializer } from "../../serializers/clients.serializers";
import  AppError  from "../../errors/appError";

const addContactOnClientService = async ( contactName: string , clientId: string ): Promise<object> => {

    const contactModel = AppDataSource.getRepository(Contact);
    const checkIfContactExists = await contactModel.findOneBy({
        name: contactName
        });
    if(!checkIfContactExists) {
        throw new AppError("Contato não encontrado", 404);
    }

    const clientModel = AppDataSource.getRepository(Client);
    const findClientInstance = await clientModel.findOneBy({
        id: clientId
    });
    if(!findClientInstance){
        throw new AppError("Cliente não encontrado", 404);
    }
 
    await AppDataSource.createQueryBuilder().relation(Client, "contact").of(clientId).add(checkIfContactExists.id)

    return { message: "Contato adicionado!" };
};

export default addContactOnClientService;
