import AppDataSource from "../../data-source"
import Contact from "../../entities/contact.entity";
import AppError from "../../errors/appError";


const deleteContactService = async (contactId:string) =>{

    const contactModel = AppDataSource.getRepository(Contact);
    const contactData = await contactModel.findOneBy(
        {
            id: contactId
        }
    );
    
    if (!contactData){
        throw new AppError ('Não encontrado', 404)
    }


    await contactModel.remove(contactData)

   
    return {message: "Contato deletado"}
}

export default deleteContactService;