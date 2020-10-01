import db from "../database/connection";

interface ILocationUser{
    user_id : number,
    location_id:number
}
class LocationUserModel{

    async new(locationUser : ILocationUser){
        let returnable
        await db('user_location')
        .insert(locationUser)
        .then(data=>{
            returnable = { message : "assigned location to user" }
        })
        .catch(e=>{
            returnable = { error : "error when assigning responsibility"}
        })
        return returnable
    }

    async delete(id:string){
        let returnable
        const deletedRows = await db('user_location')
        .where("id",id)
        .delete().then(data=>{
            returnable = {message : "excluded liability association"}
        }).catch(err=>{
            returnable = {error : "error deleting liability association"}
        })
        return returnable
    }

    async list(id:string){
        let returnable
        const listOfUserLocatios = await db('user_location')
        .where('user_id',id)
        .select('*')
        .then(data=>{
            returnable = data
        })
        .catch(e=>{
            returnable = {error:"error fetching list of users responsible for the location"}
        })
        return returnable
    }
}

export default LocationUserModel