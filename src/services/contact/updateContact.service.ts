import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import 'dotenv/config'
import AppError from "../../errors/appError";
import { IContactUpdate } from "../../interfaces/contacts";
import { updateResponseContactSerializer } from "../../serializers/contacts.serializes";

const updateContactService = async (contactData:IContactUpdate, contactId: string) : Promise<IContactUpdate> => {

    const bodyKeys = Object.keys(contactData)
    bodyKeys.forEach((value)=>{
        if(value == "id" || value == "createdAt"){
            throw new AppError('Invalid data', 401)
        }
    })
    
    const contactModel = AppDataSource.getRepository(Contact);

    const checkIfEmailExists = await contactModel.findOneBy({
        email: contactData.email,
      });
    if(checkIfEmailExists) {
      throw new AppError("Email already exists", 409);
    }

    const checkIfNameExists = await contactModel.findOneBy({
        name: contactData.name,
      });
    if(checkIfNameExists) {
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

    if(contactData.clientsId){
      updateContact.clientsId = contactData.clientsId
    }else{
      updateContact.clientsId = contactDataQuery.clientsId
    }

    try {
        const updateContactDataResp = await updateResponseContactSerializer.validate(updateContact, {
          abortEarly: true,
          stripUnknown: true
      })
        return updateContactDataResp
        
      } catch (err: any) {
        throw new AppError(err.errors)
      }
}

export default updateContactService