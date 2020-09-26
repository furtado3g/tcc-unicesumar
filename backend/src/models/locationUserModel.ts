import db from "../database/connection";

interface ILocationUser{
    user_id : number,
    location_id:number
}
class LocationUserModel{

    async new(locationUser : ILocationUser){
        const insertedRow = await db('user_location').insert(locationUser)
        return insertedRow.length ?{ message : "assigned location to user" } : { error : "error when assigning responsibility"}
    }

    async delete(id:string){
        const deletedRows = await db('user_location')
            .where("id",id)
            .delete()
        return deletedRows > 0 ? {message : "excluded liability association"} : {error : "error deleting liability association"}
    }

    async list(id:string){
        const listOfUserLocatios = await db('user_location')
            .where('user_id',id)
            .select('*')
        return listOfUserLocatios ?  {listOfUserLocatios} : {error:"error fetching list of users responsible for the location"}
    }
}

export default LocationUserModel