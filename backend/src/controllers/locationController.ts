import {Request,Response} from 'express'

import LocationModel from '../models/locationModel'

class LocationController{

    async new(req:Request,res:Response){
        const model = new LocationModel()
        const {tp_location,comments,capacity} = req.body
        const {message,error} = await model.insert({tp_location,comments,capacity})        
        return message ? res.json(message) : res.status(404).json(error)
    }
    
    async update(req:Request,res:Response){
        const model = new LocationModel()
        const {tp_location,comments,capacity} = req.body
        const {locationId} = req.params
        const {message,error} = await model.update({tp_location,comments,capacity},Number(locationId))
        return message ? res.json(message) : res.status(404).json(error)
    }
    
    async delete(req:Request,res:Response){
        const model = new LocationModel()
        const {locationId} = req.params
        const {message,error} = await model.delete(Number(locationId))
        return message ? res.json(message) : res.status(404).json(error)
    }

    async list(req:Request,res:Response){
        const model = new LocationModel()
        const sql = "select * from locations"
        const result = await model.getList(sql)
        return res.json(result['rows'])
    }

    async detail(req:Request,res:Response){
        const model = new LocationModel()
        const {locationId} = req.params
        const sql = "select * from locations where id = '"+locationId+"'"
        return await model.getList(sql)
    }

    async search(req:Request,res:Response){
        const model = new LocationModel()
        const {term,type} = req.query
        const sql = "select *"+
                    "  from locations"
                    " where tp_location = '"+type+"'"+
                    "   and comments like '%"+term+"%'"
        return await model.getList(sql)
    }
}
export default LocationController