import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { IContactResponse } from "../../interfaces/contacts"

const selectContactService = async (contactId: string) : Promise<IContactResponse> =>{
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
        }
     })
    if(!contactData){
        throw new AppError ('Not found or empty', 404)
    }
    return contactData
}

export default selectContactService
