import { Request, Response } from "express";
import UserModel from "../models/userModel";
import sessionController from "./sessionController";
import digestHash from '../util/digestHash'
import verify from '../util/verify'
import PermissionModel from '../models/permissionModel'
import sessionModel from '../models/sessionModel'
const verifier = new verify();
const permission = new PermissionModel();
const session = new sessionModel();

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
    console.log(req.body)
    if(!verifier.verifyNullIncommingFields({username,password})) return res.status(404).json({"message":"Required field not informated"});
    password = digestHash(password)
    const sessionc = new sessionController();
    const model = new UserModel()
    const verify:any = await model.verifyUser({username,password})
    if(verify.is_valid == true){
      const token = await sessionc.newSession(verify.user['id'])
      console.log(token)
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
    const {path} = req.route
    const {user_id,authorization} = req.headers
    //Checks whether the session is valid
    const logged = await session.verify(authorization)
    if(!logged.is_valid)return res.status(404).json({error:"this session is no longer valid"});
    //checks if the user has permission to access the endpoint
    const grant:any = await permission.verify(user_id,path);
    if(!grant.granted){
      return res.status(404).json({error:"you don't have permission to access this route"})
    }
    const {name,username,email,user_type} = req.body
    let {password} = req.body
    // check if any mandatory parameters do not exist
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({name,username,email,password})) return res.status(404).json({"message":"Required field not informated"});
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
      return res.json({"message":"User successfully registered"})
    }else if(error){
      return res.status(404).json({error})
    }else{
      return res.status(404).json({"message":"Error when registering user"})
    }
  }

  async update(req:Request,res:Response){
    const {name,username,email,user_type} = req.body
    const userModel = new UserModel()
    const {user_id,authorization} = req.headers
    //Checks whether the session is valid
    const logged = await session.verify(authorization)
    if(!logged.is_valid)return res.status(404).json({error:"this session is no longer valid"});
    // check if any mandatory parameters do not exist
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({name,username,email})) return res.status(404).json({"error":"Required field"});
    const created = userModel.update({
      name,
      username,
      email,
      user_type
    })
    if(created != null){
      return res.json({"message":"Data updated successfully"})
    }else{
      return res.status(404).json({"message":"Error when registering user"})
    }
  }

  async recoveryPassword(req:Request,res:Response){
    const {email} = req.body
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({email})) return res.status(404).json({"message":"Required field"});
    const userModel = new UserModel()
    const recovered = await userModel.recoveryPassword(email)
    if(recovered){
      return res.json({"message":"Check email with temporary password"})
    }else{
      return res.json({"Erro":"Error sending email with new password"}).status(404)
    }
  }

  async updatePassword(req:Request,res:Response){
    const {userId,password} = req.body
    const {authorization} = req.headers
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({userId,password})) return res.status(404).json({"message":"Required field"});
    const userModel = new UserModel()
    //Checks whether the session is valid
    const logged = await session.verify(authorization)
    if(!logged.is_valid)return res.status(404).json({error:"this session is no longer valid"});
    // check if any mandatory parameters do not exist
    const updated:any = await userModel.updatePassword(userId,password)
    if(updated.updated){
      return res.json({"message":"Password updated successfully"})
    }else{
      return res.json({"Erro":"Error updating password"}).status(404)
    }
  }

}
