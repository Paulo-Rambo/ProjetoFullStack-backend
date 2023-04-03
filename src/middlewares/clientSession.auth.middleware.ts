import { Request, Response, NextFunction } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken"
import AppError from "../errors/appError";


const clientSessionAuthMiddleware =  (req :Request, resp:Response, next: NextFunction ) => {
    const headersToken = req.headers.authorization
    
    if(!headersToken){
        throw new AppError('Faltando autorização no headers', 401)
    }
    
    const token: string = headersToken.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {

        if(error){
            throw new AppError(error.message, 401)
        }
        if(!decoded.clientId){
            throw new AppError("Não autorizado", 403)
        }
        req.auth = {
                clientId:decoded.clientId ,
        }
    })
    return next()
}

export default clientSessionAuthMiddleware;