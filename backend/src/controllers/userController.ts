import { Request, Response } from "express";
import UserModel from "../models/userModel";
import sessionController from "./sessionController";
import digestHash from '../util/digestHash'
import verify from '../util/verify'
import PermissionModel from '../models/permissionModel'
import sessionModel from '../models/sessionModel'
import jwt from 'jsonwebtoken'
const verifier = new verify();
const permission = new PermissionModel();
const session = new sessionModel();
const userModel = new UserModel()

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
    if(!verifier.verifyNullIncommingFields({username,password})) return res.status(404).json({"message":"Campo obrigatório não informado"});
    password = digestHash(password)
    const sessionc = new sessionController();
    const model = new UserModel()
    const verify:any = await model.verifyUser({username,password})
    if(verify.is_valid == true){
      const token = await sessionc.newSession(verify.user['id'])
      console.log(token)
      return res.json({ auth: verify.user['id'], token: token });
    }else{
      return res.status(404).json({message:"Usuário ou senha inválido"})
    }
  }

  /*
    Destruct the request body
    Encrypts the password using the salt defined in a controller function
    Sends the request to the database
    Persists the data using the model
  */
 async create(req:Request,res:Response){
   const {path} = req.route
   const {userid,authorization} = req.headers
   let {password} = req.body
   // check if any mandatory parameters do not exist
   const {name,username,email,user_type} = req.body
   const verifier = new verify();
   if(!verifier.verifyNullIncommingFields({name,username,email,password,userid,authorization})) return res.status(404).json({"error":"Campo obrigatório não informado"});
    //Checks whether the session is valid
    const logged = await session.verify(authorization)
    if(!logged.is_valid) return res.status(404).json({error:"Sessão inválida"});
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //  return res.status(404).json({error:"Você não possui acesso"})
    //}
    password = digestHash(password)
    const last_password = password
    const userModel = new UserModel()
    const created:any = await userModel.create({
      name : name ,
      username : username,
      password : password,
      email : email,
      last_password : last_password,
      user_type : user_type,
    })
    let error = created.error
    if(created != null && !error){
      return res.json({"message":"Usuário cadastrado com sucesso"})
    }else if(error){
      return res.status(404).json({error})
    }else{
      return res.status(404).json({"message":"Erro ao cadastrar usuário"})
    }
  }

  async update(req:Request,res:Response){
    const {name,username,email,userType} = req.body
    const {authorization} = req.headers
    if(!verifier.verifyNullIncommingFields({name,username,email,authorization})) return res.status(404).json({"error":"Campo obrigatório"});
    //Checks whether the session is valid
    const logged = await session.verify(authorization)
    if(!logged.is_valid) return res.status(404).json({error:"Sessão inválida"});
    // check if any mandatory parameters do not exist
    const created = userModel.update({
      name,
      username,
      email,
      user_type:userType
    })
    if(created != null){
      return res.json({"message":"Dados atualizados com sucesso"})
    }else{
      return res.status(404).json({"message":"Erro ao cadastrar usuário"})
    }
  }

  async recoveryPassword(req:Request,res:Response){
    const {email} = req.body
    if(!verifier.verifyNullIncommingFields({email})) return res.status(404).json({"message":"Campo obrigatório"});
    const userModel = new UserModel()
    const recovered = await userModel.recoveryPassword(email)
    console.log(recovered)
    if(recovered){
      return res.json({"message":"Verifique sua caixa de email com senha temporária"})
    }else{
      return res.json({"Erro":"Erro ao enviar email com senha temporária"}).status(404)
    }
  }

  async updatePassword(req:Request,res:Response){
    let {password,actualPassword} = req.body
    password = digestHash(password)
    actualPassword = digestHash(actualPassword)
    const {userid,authorization} = req.headers
    if(!verifier.verifyNullIncommingFields({userid,password,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
    const userModel = new UserModel()
    //Checks whether the session is valid
    const logged = await session.verify(authorization)
    if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
    const checkActual = await userModel.checkAtualPassword(userid,actualPassword)
    if(!checkActual) return res.status(404).json({Error:"Senhas não correspondem"})
    const updated:any = await userModel.updatePassword(userid,password)
    if(updated.updated){
      return res.json({"message":"Senha alterada com sucesso"})
    }else{
      return res.json({"Error":"Erro ao alterar senha"}).status(404)
    }
  }

  async detail(req: Request, res: Response) {
    const {id} = req.params
    const {userid,authorization} = req.headers
    const userModel = new UserModel()
    if(!verifier.verifyNullIncommingFields({id,userid,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
    const logged = await session.verify(authorization)
    if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
    const data =  await userModel.detail(id) 
    return res.json(data)
  }

  async listUsers(req:Request,res:Response){
    const {userid,authorization} = req.headers
    const {page,perPage} = req.query
    const userModel = new UserModel()
    if(!verifier.verifyNullIncommingFields({userid,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
    const logged = await session.verify(authorization)
    if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
    const data =  await userModel.list(Number(perPage),Number(page))
    if(JSON.stringify(data).includes('"error"')){
      return res.status(404).json(data)
    }
    return res.json(data)
  }

  async disableUser(req:Request,res:Response){
    const {userid,authorization} = req.headers
    const {action} = req.body 
    const {id} = req.params
    if(!verifier.verifyNullIncommingFields({userid,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
    const userModel = new UserModel()
    const response = await userModel.deactivate(id)||''
    if(response.includes('Erro') || response === ''){
      return res.status(404).json({"error":response})
    }
    return res.json({message:response})
  }

}
