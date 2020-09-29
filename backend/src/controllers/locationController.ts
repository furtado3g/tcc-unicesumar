import {Request,Response} from 'express'

import LocationModel from '../models/locationModel'

class LocationController{

    async new(req:Request,res:Response){
        const model = new LocationModel()
        const {tp_location,comments,capacity} = req.body
        const response= await model.insert({type:tp_location,comments,capacity})        
        return res.json(response)
    }
    
    async update(req:Request,res:Response){
        const model = new LocationModel()
        const {tp_location,comments,capacity} = req.body
        const {locationId} = req.params
        const response = await model.update({type:tp_location,comments,capacity},Number(locationId))
        return res.json(response) 
    }
    
    async delete(req:Request,res:Response){
        const model = new LocationModel()
        const {locationId} = req.params
        const response = await model.delete(Number(locationId))
        return res.json(response) 
    }

    async list(req:Request,res:Response){
        const model = new LocationModel()
        const {term,type} = req.query
        return res.send(await model.search(term,type))
    }

    async detail(req:Request,res:Response){
        const model = new LocationModel()
        const {locationId} = req.params
        return res.json(await model.detail(locationId))
        
    }

    async search(req:Request,res:Response){
        const model = new LocationModel()
        const {term,type} = req.query
        return res.send(model.search(term,type))
    }
}
export default LocationController