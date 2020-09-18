import express from "express";
import LoginController from "./controllers/userController";
import sessionController from "./controllers/sessionController";
import userController from "./controllers/userController";
import ReserveModel from "./models/reserveModel";
import ReserveController from "./controllers/reserveController";
import LocationController from "./controllers/locationController";
import PermissionController from "./controllers/permissionController";

const routes = express.Router();
//inicio das controllers 
const users = new userController()
const sessions = new sessionController()
const reserves = new ReserveController()
const location = new LocationController()
const permission = new PermissionController()

//controle  de sessão
routes.post('/session',users.validate)
routes.put('/session',sessions.extendSession)
routes.get('/session',sessions.extendSession)
//controle de usuarios
routes.post('/user',users.create)
routes.put('/user',users.update)
//controle de reservas 
routes.post('/reserve/',reserves.create)
routes.put('/reserve/:reserveId',reserves.update)
routes.get('/reserve/',reserves.list)
routes.get('/reserve/:reserveId',reserves.detail)
//controle de locais
routes.post('/location/',location.new)
routes.get('/location/',location.list)


//controle de permissões
routes.post('/endpoint',permission.newEndpoint)
routes.post('/usertype',permission.newUserType)
routes.post('/permission',permission.assignPermission)

export default routes