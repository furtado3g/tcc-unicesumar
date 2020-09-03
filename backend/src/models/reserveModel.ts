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
        const insertedRows = await db('reserve').insert(reserve)
        const rowCount:any = insertedRows.rowCount
        if(rowCount > 0){
            return {
                message:"Reserva efetuada com sucesso"
            }
        }else{
            return {
                error : "Erro ao reservar o espaço"
            }
        }

    }

    async update (reserve:reserveInterface,reserveId:number){
        const insertedRows = await db('reserve')
            .where('id',reserveId)
            .update(reserve); 
        const rowCount:any = insertedRows.rowCount
        if(rowCount > 0){
            return {
                message:"Reserva atualizada com sucesso"
            }
        }else{
            return {
                error : "Erro ao atualizar reserva"
            }
        }
    }

    async delete(reserveId:any){
        const deletedRows = await db('reserve')
            .where('id','=',reserveId)
            .delete();
        const rowCount:any = deletedRows.rowCount
        if(rowCount > 0){
            return {
                message : "Reserva excluida com sucesso"
            }
        }else{
            return {
                error : "Erro ao excluir reserva"
            }
        }
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