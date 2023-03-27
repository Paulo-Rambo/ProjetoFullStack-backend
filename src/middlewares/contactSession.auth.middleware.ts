import { Request, Response, NextFunction } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken"
import AppError from "../errors/appError";


const contactSessionAuthMiddleware =  (req :Request, resp:Response, next: NextFunction ) => {
    const headersToken = req.headers.authorization
    
    if(!headersToken){
        throw new AppError('Missing authorization headers', 401)
    }
    
    const token: string = headersToken.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {

        if(error){
            throw new AppError(error.message, 401)
        }

        req.auth = {
                contactId:decoded.contactId ,
        }
    })
    return next()
}

export default contactSessionAuthMiddleware;