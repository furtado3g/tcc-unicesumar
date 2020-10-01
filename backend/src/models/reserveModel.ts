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
        console.log(reserve)
        const insertedRows = await db('reservations').insert(reserve)
        .then(data=>{
            console.log(data)
            returnable = {
                message:"Successful booking"
            }
        })
        .catch(e=>{
            //traduzir retorno a baixo
            returnable = {
                error : "Erro ao reservar o espaço"
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
                message:"Reservation updated successfully"
            }
        }).catch(()=>{
            returnable = {
                error : "Error updating booking"
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
                message : "Reservation successfully deleted"
            }
        }).catch(e=>{
            returnable = {
                error : "Error deleting reservation"
            }
        })
        return returnable 
    }

    async list(page:any,perPage:any){
        attachPaginate();
        const itens = await db('reservations').paginate({
            perPage : perPage || 10,
            currentPage : page || 1
        })
        return itens.data
    }

    async detail(reserveId:any){
        const reserve = db('reservations').select('*').where('id',reserveId)
        return reserve
    }
}

export default ReserveModel