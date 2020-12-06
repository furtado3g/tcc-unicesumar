import {Request,Response} from 'express'
import ReserveModel from '../models/reserveModel';

interface reserveInterface{
    user_id:number,
    location_id:number,
    date:string,
    time_start:string,
    time_end:string,
    classes:string,
    discipline:string,
    comments:string
}

class ReserveController{

    async create(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {
            user_id,
            location_id,
            date,
            time_start,
            time_end,
            classes,
            discipline,
            comments
        } = req.body; 
        return res.json( await reserveModel.insert({
            teacher_id:user_id,
            location_id,
            date,
            time_start,
            time_end,
            class : classes,
            discipline,
            comments
        }))
    }

    async update(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveId} = req.params
        const {
            user_id,
            location_id,
            date,
            time_start,
            time_end,
            classes,
            discipline,
            comments
        } = req.body;
        return res.json(await reserveModel.update({
            teacher_id:user_id,
            location_id,
            date,
            time_start,
            time_end,
            class : classes,
            discipline,
            comments
        },Number(reserveId)))
    }
    
    async delete(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveId} = req.params
        return res.json(await reserveModel.delete(Number(reserveId)))
    }

    async list(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {page,perPage} = req.query
        return res.json(await reserveModel.list(Number(page),Number(perPage)))
    }

    async detail(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveId} = req.params
        return res.json(await reserveModel.detail(reserveId))
    }

}

export default  ReserveController