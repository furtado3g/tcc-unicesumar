import { Request,Response} from 'express';
import LocationUserModel from '../models/locationUserModel';


class LocationUserController{

    async assign(req:Request,res:Response){
        const {locationId,userId} = req.body
        const model = new LocationUserModel()
        return res.json( await model.new({location_id:locationId,user_id:userId}))
    }

    async unassign(req:Request,res:Response){
        const {locationUserId} = req.params
        const model = new LocationUserModel()
        return res.json(await model.delete(locationUserId))
    }

    async listAssigns(req:Request,res:Response){
        const {userId} = req.params
        const model = new LocationUserModel()
        return res.json(await model.list(userId))
    }
}

export default LocationUserController