import { IAuthLogin } from "../../interfaces/authLogin";
import Contact from "../../entities/contact.entity";
import AppDataSource from "../../data-source";
import  AppError  from "../../errors/appError";
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'

const loginContactService = async ( contactDataReq: IAuthLogin): Promise<object> => {
  const contactModel = AppDataSource.getRepository(Contact);
  const findContact = await contactModel.findOneBy({
      email: contactDataReq.email,
    },);
  if (!findContact) {
    throw new AppError('Wrong email or password', 403);
  }

  const authPass = await compare(contactDataReq.password, findContact.password)
  
  if(!authPass){
    throw new AppError('Wrong email or password', 403);
}

const token = jwt.sign(
    {
        contactId: findContact.id,
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h'

    }
)
return {token: token}
};

export default loginContactService;