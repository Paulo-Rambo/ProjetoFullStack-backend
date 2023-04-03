import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { IContact } from "../../interfaces/contacts"

const selectContactService = async (contactId: string) : Promise<IContact> =>{
    const contactModel = AppDataSource.getRepository(Contact);
    const contactData = await contactModel.findOne({
        where:{
            id: contactId
        },
        select:{
            name:true,
            email:true,
            createdAt:true,
            id:true,
            telephone:true,
        }
     })
    if(!contactData){
        throw new AppError ('Não encontrado ou vazio', 404)
    }
    return contactData
}

export default selectContactService
