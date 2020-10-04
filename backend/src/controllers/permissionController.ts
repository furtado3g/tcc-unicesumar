import {json, Request,Response} from'express';
import PermissionModel from '../models/permissionModel';
import verify from '../util/verify'
const model = new PermissionModel()
const verifier = new verify();
class PermissionController{

    async newEndpoint(req:Request,res:Response){
        const {url} = req.body
        if(!verifier.verifyNullIncommingFields({url})) return res.status(404).json({"message":"mandatory field not informed"});
        const data = await model.newEndPoint(url)
        return res.json(data) 
    }

    async newUserType(req:Request,res:Response){
        const {description} = req.body
        if(!verifier.verifyNullIncommingFields({description})) return res.status(404).json({"message":"mandatory field not informed"});
        return res.json(await model.newUserType(description))
    }

    async assignPermission(req:Request,res:Response){
        const {idUser,url} = req.body
        if(!verifier.verifyNullIncommingFields({url,idUser})) return res.status(404).json({"message":"mandatory field not informed"});
        return res.json(await model.assign(idUser,url))
    }
    
    async listUserPermissions(req:Request,res:Response){
        const {idUser} = req.params
        if(!verifier.verifyNullIncommingFields({idUser})) return res.status(404).json({"message":"mandatory field not informed"});
        return res.json(await model.listUserPermissions(idUser))
    }
    
}

export default PermissionController