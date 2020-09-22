import { Request, Response } from "express";
import UserModel from "../models/userModel";
import sessionController from "./sessionController";
import * as DBkey from '../db.json'
import digestHash from '../util/digestHash'
export default class userController {

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
    const verify:any = await model.verifyUser({username,password})
    if(verify.is_valid == true){
      const token = await session.newSession(verify.user['id'])
      return res.json({ auth: verify.user['id'], token: token });
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
      name : name ,
      username : username,
      password : password,
      email : email,
      last_password : last_password
    })
    if(created != null){
      return res.json({"message":"Usuario Criado Com Sucesso!"})
    }else{
      return res.status(404).json({"message":"Erro ao criar novo Usuario"})
    }
  }

  async update(req:Request,res:Response){
    const {name,username,email} = req.body
    let {password} = req.body
    const salt = DBkey.key
    password = digestHash(password)
    const last_password = password
    const userModel = new UserModel()
    const created = userModel.update({
      name,
      username,
      password,
      email,
      last_password
    })
    if(created != null){
      return res.json({"message":"Informações do Usuario Atualizadas Com Sucesso!"})
    }else{
      return res.status(404).json({"message":"Erro ao criar novo Usuario"})
    }
  }

  async recoveryPassword(req:Request,res:Response){
    const {userName} = req.body
    const userModel = new UserModel()
    const recovered:any = await userModel.recoveryPassword(userName)
    if(recovered.updated){
      return res.json({"message":"Foi enviado um email com sua senha provisória"})
    }else{
      return res.json({"Erro":"Erro ao enviar o email com nova senha"}).status(404)
    }
  }

  async updatePassword(req:Request,res:Response){
    const {userId,password} = req.body
    const userModel = new UserModel()
    const updated:any = await userModel.updatePassword(userId,password)
    if(updated.updated){
      return res.json({"message":"Senha atualizada com sucesso"})
    }else{
      return res.json({"Erro":"Erro ao Atualizar Senha"}).status(404)
    }
  }

}
