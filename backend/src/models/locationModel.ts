import db from "../database/connection"

interface ILocation{
    "tp_location":string,
    "comments":string,
    "capacity":number
}

class LocationModel{
    async insert(location:ILocation){
        const insertedRows = await db('location').insert(location)
        return insertedRows.rowCount > 0 ?{"message":"Local Registrado Com Sucesso"} : {"error":"Erro ao Registrar Local"}
    }

    async update(location:ILocation,locationId:number){
        const updatedRows = await db('location')
            .where('id',locationId)
            .update(location)
        return updatedRows.rowCount > 0 ? {message :"Local atualizado com sucesso"} : {"error":"Erro ao Atualizar Descrição do Local"}
    }
    
    async delete(locationId:number){
        const deletedRows = await db('location')
        .where('id',locationId)
        return deletedRows.rowCount  > 0 ? {"message":"Local Excluido com Sucesso"} : {"error" : "Erro ao Excluir Local"}
    }

    async getList(sql:string){
        const response = db.raw(sql)
        return response
    }
}

export default LocationModel