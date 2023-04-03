import { Request, Response } from "express";
import loginContactService from "../services/auth/loginContact.service";
import loginClientService from "../services/auth/loginClient.service";
import { IAuthLogin } from "../interfaces/authLogin";

const loginContactController = async (req: Request, resp: Response) => {
    const dataReq: IAuthLogin = req.body;
    const dataResp = await loginContactService(dataReq);
    return resp.status(200).json(dataResp);
  };

const loginClientController = async (req: Request, resp: Response) => {
    const dataReq: IAuthLogin = req.body;
    const dataResp = await loginClientService(dataReq);
    return resp.status(200).json(dataResp);
  };

export { loginContactController, loginClientController };