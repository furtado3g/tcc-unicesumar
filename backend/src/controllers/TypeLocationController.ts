import {Request,Response} from 'express'
import TypeLocationModel from '../models/typeLocationModel' 
import sessionModel from '../models/sessionModel'
import PermissionModel from '../models//permissionModel';
import Verifier from '../util/verify'

const session = new sessionModel();
const permission = new PermissionModel();
const verifier = new Verifier();
const model = new  TypeLocationModel()

class TypeLocationController{
    async create(req:Request,res:Response){
        const {path} = req.route
        const {user_id,authorization} = req.headers
        const {description} = req.body
        if(!verifier.verifyNullIncommingFields({user_id,authorization,description})) return res.status(404).json({"message":"Required field"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"this session is no longer valid"});
        //checks if the user has permission to access the endpoint
        const grant:any = await permission.verify(user_id,path);
        if(!grant.granted){
        return res.status(404).json({error:"you don't have permission to access this route"})
        }
        const model = new TypeLocationModel()
        return res.json(await model.create(description))
    }
    
    async delete(req:Request,res:Response){
        const {path} = req.route
        const {id} = req.params
        const {user_id,authorization} = req.headers
        if(!verifier.verifyNullIncommingFields({user_id,authorization,id})) return res.status(404).json({"message":"Required field"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"this session is no longer valid"});
        //checks if the user has permission to access the endpoint
        const grant:any = await permission.verify(user_id,path);
        if(!grant.granted){
        return res.status(404).json({error:"you don't have permission to access this route"})
        }
        return res.json(await model.delete(Number(id)))
    }
    
    async list(req:Request,res:Response){
        const {path} = req.route
        const {user_id,authorization} = req.headers
        if(!verifier.verifyNullIncommingFields({user_id,authorization})) return res.status(404).json({"message":"Required field"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"this session is no longer valid"});
        //checks if the user has permission to access the endpoint
        const grant:any = await permission.verify(user_id,path);
        if(!grant.granted){
        return res.status(404).json({error:"you don't have permission to access this route"})
        }
        const list = await model.list()
        return res.json(list)
    }
}

export default TypeLocationController