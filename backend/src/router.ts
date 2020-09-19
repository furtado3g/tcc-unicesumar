import express from "express";
import sessionController from "./controllers/sessionController";
import userController from "./controllers/userController";
import ReserveController from "./controllers/reserveController";
import LocationController from "./controllers/locationController";
import PermissionController from "./controllers/permissionController";
import LocationUserController from "./controllers/locationUserController";

const routes = express.Router();
//inicio das controllers 
const users = new userController()
const sessions = new sessionController()
const reserves = new ReserveController()
const location = new LocationController()
const permission = new PermissionController()
const locationUser = new LocationUserController()
//controle  de sessão
routes.post('/session',users.validate)
routes.put('/session',sessions.extendSession)
//controle de usuarios
routes.post('/user',users.create)
routes.put('/user',users.update)
//controle de reservas 
routes.post('/reserve/',reserves.create)
routes.put('/reserve/:reserveId',reserves.update)
routes.get('/reserve/',reserves.list)
routes.get('/reserve/:reserveId',reserves.detail)
routes.delete('/reserve/:reserveId',reserves.delete)
//controle de responsaveis do local
routes.post('/location/user/',locationUser.assign)
routes.delete('/location/user/:locationUserId',locationUser.unassign)
routes.get('/location/user/:userId',locationUser.listAssigns)
//controle de locais
routes.post('/location/',location.new)
routes.put('/location/',location.update)
routes.delete('/location/',location.delete)
routes.get('/location/',location.list)
routes.get('/location/:locationId',location.detail)
routes.get('/location/',location.search)
//controle de permissões
routes.post('/endpoint',permission.newEndpoint)
routes.post('/usertype',permission.newUserType)
routes.post('/permission',permission.assignPermission)
routes.get('/user/:idUser/permissions',permission.listUserPermissions)
export default routes