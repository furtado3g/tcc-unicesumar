import { Request, Response } from "express";
import crypto from "crypto";
import jsonwebtoken from 'jsonwebtoken';
import Knex from "knex";
import UserModel from "../models/userModel";

export default class LoginController {
  async validate(req: Request, res: Response) {
    const { username, password } = req.body;
    const digestedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");
    const token = jsonwebtoken.sign({username},"A$N0tH1nG")
    return res.json({ auth: true, token: token });
  }

  async create(req:Request,res:Response){
    const {name,userName,password} = req.body
    const last_password = password
    const userModel = new UserModel()
    const created = userModel.create({
      name,
      userName,
      password,
      last_password
    })
    if(created != null){
      return res.json({"message":"Usuario Criado Com Sucesso!"})
    }else{
      return res.status(404).json({"message":"Erro ao criar novo Usuario"})
    }
  }
}
