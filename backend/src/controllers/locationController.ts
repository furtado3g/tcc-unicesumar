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

    async list(req:Request,res:Response){
        const sql = "select * from locations"
        return await this.model.getList(sql)
    }

    async detail(req:Request,res:Response){
        const {locationId} = req.params
        const sql = "select * from locations where id = '"+locationId+"'"
        return await this.model.getList(sql)
    }

    async search(req:Request,res:Response){
        const {term,type} = req.query
        const sql = "select *"+
                    "  from locations"
                    " where tp_location = '"+type+"'"+
                    "   and comments like '%"+term+"%'"
        return await this.model.getList(sql)
    }
}
export default LocationController