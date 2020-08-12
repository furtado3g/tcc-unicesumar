import express from "express";
import LoginController from "./controllers/loginController";
const routes = express.Router();

routes.post('/',new LoginController().validate)

export default routes