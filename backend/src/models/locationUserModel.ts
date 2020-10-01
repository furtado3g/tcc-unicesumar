import db from "../database/connection";

interface ILocationUser{
    user_id : number,
    location_id:number
}
class LocationUserModel{

    async new(locationUser : ILocationUser){
        let returnable
        const relationExists = await db('user_location')
        .select('*')
        .where('user_id',locationUser.user_id)
        .where('location_id',locationUser.location_id)
        if (relationExists[0]){
            return {
                error : "Existing relationship"
            }            
        }
        await db('user_location')
        .insert(locationUser)
        .then(data=>{
            returnable = { message : "Assigned location to user" }
        })
        .catch(e=>{
            returnable = { error : "Error when assigning relationship"}
        })
        return returnable
    }

    async delete(id:string){
        let returnable
        const idExists = await db('user_location')
        .select('*')
        .where('id',id)
        if(!idExists[0]){
            return  {
                error : "Non-existent relationship"
            }
        }
        const deletedRows = await db('user_location')
        .where("id",id)
        .delete().then(data=>{
            returnable = {message : "Excluded liability association"}
        }).catch(err=>{
            returnable = {error : "Error deleting liability association"}
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
            returnable = {error:"Error fetching list of users responsible for the location"}
        })
        return returnable
    }
}

export default LocationUserModel