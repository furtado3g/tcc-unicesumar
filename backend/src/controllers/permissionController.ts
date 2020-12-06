import {json, Request,Response} from'express';
import PermissionModel from '../models/permissionModel';

const model = new PermissionModel()

class PermissionController{

    async newEndpoint(req:Request,res:Response){
        const {url} = req.body
        const data = await model.newEndPoint(url)
        return res.json(data) 
    }

    async newUserType(req:Request,res:Response){
        const {description} = req.body
        return res.json(await model.newUserType(description))
    }

    async assignPermission(req:Request,res:Response){
        const {idUser,url} = req.body
        return res.json(await model.assign(idUser,url))
    }
    
    async listUserPermissions(req:Request,res:Response){
        const {idUser} = req.params
        return res.json(await model.listUserPermissions(idUser))
    }
}

export default PermissionController