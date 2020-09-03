import db from "../database/connection"

interface ILocation{
    "tpLocation":string,
    "comments":string,
    "capacity":number
}

class LocationModel{
    async insert(location:ILocation){
        const insertedRows = await db('location').insert(location)
        return insertedRows.rowCount > 0 ?{"message":"Local Registrado Com Sucesso"} : {"error":"Erro ao Registrar Local"}
    }

    async update(location:ILocation,locationId:number){
        const updatedRows = await db('loation')
            .where('id',locationId)
            .update(location)
        return updatedRows.rowCount > 0 ? updatedRows : {"error":"Erro ao Atualizar Descrição do Local"}
    }
}

export default LocationModel