import { Request,Response} from 'express';
import LocationUserModel from '../models/locationUserModel';
import PermissionModel from '../models/permissionModel';
import SessionModel from '../models/sessionModel';

const session = new SessionModel();
const permission = new PermissionModel();

class LocationUserController{

    async assign(req:Request,res:Response){
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
        const {locationId,userId} = req.body
        const model = new LocationUserModel()
        return res.json( await model.new({location_id:locationId,user_id:userId}))
    }

    async unassign(req:Request,res:Response){
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
        const {locationUserId} = req.params
        const model = new LocationUserModel()
        return res.json(await model.delete(locationUserId))
    }

    async listAssigns(req:Request,res:Response){
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
        const {userId} = req.params
        const model = new LocationUserModel()
        return res.json(await model.list(userId))
    }
}

export default LocationUserController