import {Request,Response} from 'express'
import TypeLocationModel from '../models/typeLocationModel' 
import sessionModel from '../models/sessionModel'
import permissionModel from '../models//permissionModel'
import PermissionModel from '../models//permissionModel';

const session = new sessionModel();
const permission = new PermissionModel();

class TypeLocationController{
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
        const {description} = req.body
        const model = new TypeLocationModel()
        return res.json(await model.create(description))
    }
    
    async delete(req:Request,res:Response){
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
        const {id} = req.params
        const model = new  TypeLocationModel()
        return res.json(await model.delete(Number(id)))
    }
    
    async list(req:Request,res:Response){
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
        const model = new TypeLocationModel()
        const list = await model.list()
        console.log(list)
        return res.json(list)
    }
}

export default TypeLocationController