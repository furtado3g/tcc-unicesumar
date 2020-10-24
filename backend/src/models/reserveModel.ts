import db from "../database/connection";

import { attachPaginate } from 'knex-paginate' ;


interface reserveInterface{
    "teacher_id":number,
    "location_id":number,
    "date":string,
    "time_start":string,
    "time_end":string,
    "class":string,
    "discipline":string,
    "comments":Text
}

class ReserveModel{
    
    async insert (reserve:reserveInterface){
        let returnable
        const labIsTaken = await db('reservations')
        .where('location_id',reserve.location_id)
        .where('date',reserve.date)
        .whereBetween('time_start',[reserve.time_end,reserve.time_start])
        .whereBetween('time_end',[reserve.time_end,reserve.time_start])
        if(labIsTaken[0]){
            return {
                message : "Espaço já reservado"
            }
        }
        const insertedRows = await db('reservations').insert(reserve)
        .then(data=>{
            console.log(data)
            returnable = {
                message:"Reserva efetuada com sucesso"
            }
        })
        .catch(e=>{
            //traduzir retorno a baixo
            returnable = {
                error : "Erro ao realizar reserva"
            }
        })
        return returnable
    }

    async update (reserve:reserveInterface,reserveId:number){
        let returnable 
        console.log(reserve)
        const insertedRows = await db('reservations')
        .where('id',reserveId)
        .update(reserve)
        .then(data=>{
            returnable = {
                message:"Reserva atualizada com sucesso"
            }
        }).catch(()=>{
            returnable = {
                error : "Erro ao atualizar reserva"
            }
        }) 
        return returnable
    }

    async delete(reserveId:any){
        let returnable 
        const deletedRows = await db('reservations')
        .where('id','=',reserveId)
        .delete()
        .then(data=>{
            returnable = {
                message : "Reserva excluída com sucesso"
            }
        }).catch(e=>{
            returnable = {
                error : "Erro ao excluir reserva"
            }
        })
        return returnable 
    }

    async list(page:any,perPage:any){
        attachPaginate();
        const itens = await db('reservations')
        .limit(perPage || 10)
        .offset((page*perPage) || 1)
        .select('*')
        return itens
    }

    async detail(reserveId:any){
        const reserve = db('reservations').select('*').where('id',reserveId)
        return reserve
    }
}

export default ReserveModel