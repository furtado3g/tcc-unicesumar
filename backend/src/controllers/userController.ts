import { Request, Response } from "express";
import UserModel from "../models/userModel";
import sessionController from "./sessionController";
import digestHash from '../util/digestHash'
import verify from '../util/verify'
import { Console } from "console";
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
    const {name,username,email} = req.body
    let {password} = req.body
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({name,username,email,password})) return res.status(404).json({"message":"Required field"});
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
      return res.json({"message":"User successfully registered"})
    }else{
      return res.status(404).json({"message":"Error when registering user"})
    }
  }

  async update(req:Request,res:Response){
    const {name,username,email} = req.body
    const userModel = new UserModel()
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({name,username,email})) return res.status(404).json({"error":"Required field"});
    const created = userModel.update({
      name,
      username,
      email,
    })
    if(created != null){
      return res.json({"message":"Data updated successfully"})
    }else{
      return res.status(404).json({"message":"Error when registering user"})
    }
  }

  async recoveryPassword(req:Request,res:Response){
    const {username} = req.body
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({username})) return res.status(404).json({"message":"Required field"});
    const userModel = new UserModel()
    console.log(username)
    const recovered = await userModel.recoveryPassword(username)
    if(recovered){
      return res.json({"message":"Check email with temporary password"})
    }else{
      return res.json({"Erro":"Error sending email with new password"}).status(404)
    }
  }

  async updatePassword(req:Request,res:Response){
    const {userId,password} = req.body
    const verifier = new verify();
    if(!verifier.verifyNullIncommingFields({userId,password})) return res.status(404).json({"message":"Required field"});
    const userModel = new UserModel()
    const updated:any = await userModel.updatePassword(userId,password)
    if(updated.updated){
      return res.json({"message":"Password updated successfully"})
    }else{
      return res.json({"Erro":"Error updating password"}).status(404)
    }
  }

}
