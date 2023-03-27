import { Router } from "express";
import { 
    createClientController, 
    getClientController, 
    updateClientController,
    deleteClientController,
    listClientContactsController
    } from "../controllers/client.controller";
import { loginClientController } from "../controllers/auth.controller";
import { createClientSerializer, clientUpdateSerializer } from "../serializers/clients.serializers";
import clientSessionAuthMiddleware from "../middlewares/clientSession.auth.middleware";
import validateReqDataMiddleware from "../middlewares/validateReqData.middleware";

const clientRoutes = Router();

clientRoutes.post('', validateReqDataMiddleware(createClientSerializer), createClientController)
clientRoutes.get('', clientSessionAuthMiddleware, getClientController)
clientRoutes.patch('', 
    clientSessionAuthMiddleware, 
    validateReqDataMiddleware(clientUpdateSerializer), 
    updateClientController
    )
clientRoutes.delete('', clientSessionAuthMiddleware, deleteClientController)
clientRoutes.get('/contacts', clientSessionAuthMiddleware, listClientContactsController)
clientRoutes.post('/login', loginClientController)

export default clientRoutes;
