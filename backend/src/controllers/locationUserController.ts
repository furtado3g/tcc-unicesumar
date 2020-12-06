import { Request,Response} from 'express';
import LocationUserModel from '../models/locationUserModel';


class LocationUserController{

    private model = new LocationUserModel()

    async assign(req:Request,res:Response){
        const {locationId,userId} = req.body
        const {message,error} = await this.model.new({locationId,userId})
        return error ? res.json(message) : res.status(404).json(error)
    }

    async unassign(req:Request,res:Response){
        const {id} = req.body
        const {message,error} = await this.model.delete(id)
        return error ? res.json(message) : res.status(404).json(error)
    }

    async listAssigns(req:Request,res:Response){
        const {userId} = req.params
        const id = Number(userId )
        const {listOfUserLocatios,error} = await this.model.list(id)
        return error ? res.status(404).json(error) : res.json(listOfUserLocatios)
    }
}

export default LocationUserController