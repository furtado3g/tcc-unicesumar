import db from "../database/connection";

 
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

    async update (reserve:reserveInterface){
        const sql = '';
        const insertedRows = await db.raw(sql); 
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

}