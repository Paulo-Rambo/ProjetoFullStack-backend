import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import 'dotenv/config'
import AppError from "../../errors/appError";
import { IContactUpdate, IContactResponse } from "../../interfaces/contacts";
import { updateResponseContactSerializer } from "../../serializers/contacts.serializes";

const updateContactService = async (contactData:IContactUpdate, contactId: string) : Promise<IContactResponse> => {

    const contactModel = AppDataSource.getRepository(Contact);

    const checkIfEmailExists = await contactModel.findOneBy({
        email: contactData.email,
      });
    if(contactData.email && checkIfEmailExists) {
      throw new AppError("Email already exists", 409);
    }

    const checkIfNameExists = await contactModel.findOneBy({
        name: contactData.name,
      });
    if(contactData.name && checkIfNameExists) {
      throw new AppError("Name already exists", 409);
    }

    const contactDataQuery = await contactModel.findOneBy(
        {
            id: contactId
        }
    );
    if(!contactDataQuery){
        throw new AppError ('Contact not found', 404)
    }
    
    const updateContact = contactModel.create({
        ...contactDataQuery, ...contactData
    })

    await contactModel.save(updateContact)

    try {
        const updateContactDataResp = await updateResponseContactSerializer.validate(updateContact, {
          abortEarly: true,
          stripUnknown: true
      })
        return {data:updateContactDataResp, message:"Contato atualizado com sucesso"}
        
      } catch (err: any) {
        throw new AppError(err.errors)
      }
}

export default updateContactService