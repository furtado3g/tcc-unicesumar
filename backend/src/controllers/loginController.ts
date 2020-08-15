import { Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import UserModel from "../models/userModel";
import digestHash from "../util/digestHash";
import sessionController from "./sessionController";

export default class LoginController {
  
  async validate(req: Request, res: Response) {
    const { username} = req.body;
    let {password} = req.body;
    password = digestHash(password)
    const session = new sessionController();
    const model = new UserModel()
    await model.verifyUser(username,password)
    const token = await session.newSession(username)
    return res.json({ auth: true, token: token });
  }

  /*
    Desestrutura o corpo da requisição 
    Criptografa a senha utilizando o salt definido em uma função do controller
    Envia a solicitação ao banco de dados
    Persiste os dados utilizando a model
  */
  async create(req:Request,res:Response){
    const {name,userName,email} = req.body
    let {password} = req.body
    const salt = "SistemaDeGerenciamento"
    password = digestHash(password)
    const last_password = password
    const userModel = new UserModel()
    const created = userModel.create({
      name,
      userName,
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
