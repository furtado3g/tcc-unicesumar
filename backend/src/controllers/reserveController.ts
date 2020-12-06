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

    private reserveModel = new ReserveModel()

    async create(req:Request,res:Response){
        const {reserveInterface} = req.body; 
        return await this.reserveModel.insert(reserveInterface)
    }

    async update(req:Request,res:Response){
        const {reserveId} = req.params
        const {reserveInterface} = req.body;
        return await this.reserveModel.update(reserveInterface,Number(reserveId))
    }
    
    async delete(req:Request,res:Response){
        const {reserveId} = req.params
        return await this.reserveModel.delete(Number(reserveId))
    }

    async list(req:Request,res:Response){
        const {page,perPage} = req.query
        return await this.reserveModel.list(Number(page),Number(perPage))
    }

    async detail(req:Request,res:Response){
        const {reserveId} = req.params
        return await this.reserveModel.detail
    }

}

export default  ReserveController