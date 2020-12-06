import {json, Request,Response} from'express';
import PermissionModel from '../models/permissionModel';
import verify from '../util/verify'
import sessionModel from '../models/sessionModel'
const model = new PermissionModel()
const verifier = new verify();
const session = new sessionModel();

class PermissionController{

    async newEndpoint(req:Request,res:Response){
        const {url} = req.body
        if(!verifier.verifyNullIncommingFields({url})) return res.status(404).json({"message":"Campo obrigatório não informado"});
        const data = await model.newEndPoint(url)
        return res.json(data) 
    }

    async newUserType(req:Request,res:Response){
        const {description} = req.body
        if(!verifier.verifyNullIncommingFields({description})) return res.status(404).json({"message":"Campo obrigatório não informado"});
        return res.json(await model.newUserType(description))
    }

    async assignPermission(req:Request,res:Response){
        const {path} = req.route
        const {user_id,authorization} = req.headers
        const {idUser,url} = req.body
        console.log({idUser,url,user_id,authorization})
        if(!verifier.verifyNullIncommingFields({url,idUser,user_id,authorization})) return res.status(404).json({"message":"Campo obrigatório não informado"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:logged.message});
        //checks if the user has permission to access the endpoint
        const grant:any = await model.verify(user_id,path);
        if(!grant.granted){
            return res.status(404).json({error:"Você não possui permissão para acesso"})
        }
        return res.json(await model.assign(idUser,url))
    }
    
    async listUserPermissions(req:Request,res:Response){
        const {path} = req.route
        const {user_id,authorization} = req.headers
        const {idUser} = req.params
        if(!verifier.verifyNullIncommingFields({idUser,user_id,authorization})) return res.status(404).json({"message":"Campo obrigatório não informado"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        const grant:any = await model.verify(user_id,path);
        if(!grant.granted){
        return res.status(404).json({error:"Você não possui permissão para acesso"})
        }
        return res.json(await model.listUserPermissions(idUser))
    }
    
}

export default PermissionController