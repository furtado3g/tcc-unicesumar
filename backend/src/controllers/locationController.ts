import {Request,Response} from 'express'

import LocationModel from '../models/locationModel'

class LocationController{

    model = new LocationModel()

    async new(req:Request,res:Response){
        const {tp_location,comments,capacity} = req.body
        const {message,error} = await this.model.insert({tp_location,comments,capacity})        
        return message ? res.json(message) : res.status(404).json(error)
    }
    
    async update(req:Request,res:Response){
        const {tp_location,comments,capacity} = req.body
        const {locationId} = req.params
        const {message,error} = await this.model.update({tp_location,comments,capacity},Number(locationId))
        return message ? res.json(message) : res.status(404).json(error)
    }
    
    async delete(req:Request,res:Response){
        const {locationId} = req.params
        const {message,error} = await this.model.delete(Number(locationId))
        return message ? res.json(message) : res.status(404).json(error)
    }

    list(req:Request,res:Response){
        
    }

    detail(req:Request,res:Response){
    
    }

    search(req:Request,res:Response){
        
    }
}
export default LocationController