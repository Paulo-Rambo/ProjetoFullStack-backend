import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import  AppError  from "../../errors/appError";

const listClientContactsService = async (clientsId: string) : Promise<Contact[]> =>{
    const contactModel = AppDataSource.getRepository(Contact);
    
     const clientsContactsData = await contactModel
    .createQueryBuilder("contact")
    .where("contact.clients = :id_client", { id_client: clientsId })
    .select([
      "id as id",
      "contact.name as name",
      "contact.email as email",
      "contact.createdAt as createdAt",
    ])
    .getRawMany();

    if(!clientsContactsData){
        throw new AppError ('Not found or empty', 404)
    }
    return clientsContactsData
}

export default listClientContactsService