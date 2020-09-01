import express from "express";
import LoginController from "./controllers/userController";
import sessionController from "./controllers/sessionController";
import userController from "./controllers/userController";
const routes = express.Router();

//controle  de sessão
routes.post('/session',new userController().validate)
routes.put('/session',new sessionController().extendSession)
routes.get('/session',new sessionController().extendSession)
//controle de usuarios
routes.post('/user',new userController().create)
routes.put('/user',new userController().update)

export default routes