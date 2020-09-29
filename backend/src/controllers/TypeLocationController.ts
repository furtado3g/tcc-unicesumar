import {Request,Response} from 'express'
import TypeLocationModel from '../models/typeLocationModel' 

class TypeLocationController{
    async create(req:Request,res:Response){
        const {description} = req.body
        const model = new TypeLocationModel()
        return res.json(await model.create(description))
    }

    async delete(req:Request,res:Response){
        const {id} = req.params
        const model = new  TypeLocationModel()
        return res.json(await model.delete(Number(id)))
    }

    async list(req:Request,res:Response){
        const model = new TypeLocationModel()
        const list = await model.list()
        console.log(list)
        return res.json(list)
    }
}

export default TypeLocationController