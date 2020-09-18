import db from "../database/connection";

import { attachPaginate } from 'knex-paginate' ;


interface reserveInterface{
    "userId":number,
    "locationId":number,
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
        const insertedRows = await db('reserve').insert(reserve)
        .then(data=>{
            returnable = {
                message:"Reserva efetuada com sucesso"
            }
        }).catch(e=>{
            returnable = {
                error : "Erro ao reservar o espaço"
            }
        })
        return returnable
    }

    async update (reserve:reserveInterface,reserveId:number){
        let returnable        
        const insertedRows = await db('reserve')
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
        const deletedRows = await db('reserve')
        .where('id','=',reserveId)
        .delete()
        .then(data=>{
            returnable = {
                message : "Reserva excluida com sucesso"
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
        const itens = await db('reserve').paginate({
            perPage : perPage || 10,
            currentPage : page || 1
        })
        return itens.data
    }

    async detail(reserveId:any){
        const reserve = db('reserve').select('*').where('id',reserveId)
        return reserve
    }
}

export default ReserveModel