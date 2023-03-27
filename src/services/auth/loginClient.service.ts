import { IAuthLogin } from "../../interfaces/authLogin";
import Client from "../../entities/client.entity";
import AppDataSource from "../../data-source";
import  AppError  from "../../errors/appError";
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'

const loginClientService = async ( clientDataReq: IAuthLogin): Promise<object> => {
  const clientModel = AppDataSource.getRepository(Client);
  const findClient = await clientModel.findOneBy({
      email: clientDataReq.email,
    },);
  if (!findClient) {
    throw new AppError('Wrong email or password', 403);
  }

  const authPass = await compare(clientDataReq.password, findClient.password)
  
  if(!authPass){
    throw new AppError('Wrong email or password', 403);
}

const token = jwt.sign(
    {
        clientId: findClient.id,
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h',
    }
)
return {token: token}
};

export default loginClientService;