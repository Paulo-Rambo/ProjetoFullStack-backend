import { Router } from "express";
import { 
    createContactController, 
    getContactController, 
    updateContactController,
    deleteContactController,
    } from "../controllers/contact.controller";
import { loginContactController } from "../controllers/auth.controller";
import { createContactSerializer, updateContactSerializer } from "../serializers/contacts.serializes";
import contactSessionAuthMiddleware from "../middlewares/contactSession.auth.middleware";
import validateReqDataMiddleware from "../middlewares/validateReqData.middleware";

const contactRoutes = Router();

contactRoutes.post('', validateReqDataMiddleware(createContactSerializer), createContactController)
contactRoutes.get('', contactSessionAuthMiddleware, getContactController)
contactRoutes.patch('', 
    contactSessionAuthMiddleware, 
    validateReqDataMiddleware(updateContactSerializer), 
    updateContactController
    )
contactRoutes.delete('', contactSessionAuthMiddleware, deleteContactController)
contactRoutes.post('/login', loginContactController)

export default contactRoutes;
