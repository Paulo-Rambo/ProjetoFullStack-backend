import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import  AppError  from "../../errors/appError";
import { IsNull } from "typeorm";

const showContactsLeftService = async () : Promise<Contact[]> =>{
    const contactModel = AppDataSource.getRepository(Contact);
    
     const clientsContactsData = await contactModel
    .createQueryBuilder("contact")
    .where("contact.clientsId IS NULL")
    .select([
      "id as id",
      "contact.name as name",
      "contact.email as email",
      "contact.createdAt as createdAt",
    ])
    .getRawMany();

    if(!clientsContactsData){
        throw new AppError ('Não encontrado ou vazio', 404)
    }
    return clientsContactsData
}

export default showContactsLeftService