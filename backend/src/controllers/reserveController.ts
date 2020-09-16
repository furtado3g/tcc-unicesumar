import {Request,Response} from 'express'
import ReserveModel from '../models/reserveModel';

interface reserveInterface{
    userId:number,
    locationId:number,
    date:string,
    time_start:string,
    time_end:string,
    class:string,
    discipline:string,
    comments:string
}

class ReserveController{

    async create(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveInterface} = req.body; 
        return await reserveModel.insert(reserveInterface)
    }

    async update(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveId} = req.params
        const {reserveInterface} = req.body;
        return await reserveModel.update(reserveInterface,Number(reserveId))
    }
    
    async delete(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveId} = req.params
        return await reserveModel.delete(Number(reserveId))
    }

    async list(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {page,perPage} = req.query
        return await reserveModel.list(Number(page),Number(perPage))
    }

    async detail(req:Request,res:Response){
        const reserveModel = new ReserveModel()
        const {reserveId} = req.params
        return await reserveModel.detail
    }

}

export default  ReserveController