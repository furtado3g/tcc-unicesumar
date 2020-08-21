import { Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import UserModel from "../models/userModel";
import digestHash from "../util/digestHash";
import sessionController from "./sessionController";

export default class LoginController {

  /*
    Destruct the request body
    Generates the user's password hash
    Starts the session model
    Checks whether user information exists in the bank
    Creates the session and persists the session and its validity
  */
  async validate(req: Request, res: Response) {
    const {username} = req.body;
    let {password} = req.body;
    password = digestHash(password)
    const session = new sessionController();
    const model = new UserModel()
    const verify = await model.verifyUser({username,password})
    if(verify.is_valid == true){
      const token = await session.newSession(verify.user['id'])
      return res.json({ auth: verify, token: token });
    }else{
      return res.json({message:"Username or password is invalid"})
    }
  }

  /*
    Destruct the request body
    Encrypts the password using the salt defined in a controller function
    Sends the request to the database
    Persists the data using the model
  */
  async create(req:Request,res:Response){
    const {name,username,email} = req.body
    let {password} = req.body
    const salt = "SistemaDeGerenciamento"
    password = digestHash(password)
    const last_password = password
    const userModel = new UserModel()
    const created = userModel.create({
      name,
      username,
      password,
      email,
      last_password
    })
    if(created != null){
      return res.json({"message":"Usuario Criado Com Sucesso!"})
    }else{
      return res.status(404).json({"message":"Erro ao criar novo Usuario"})
    }
  }
}
