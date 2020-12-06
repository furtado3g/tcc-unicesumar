import db from "../database/connection";

class TypeLocationModel{
    
    async create(description:string){
        let returnable
        await db('type_location')
        .insert({description})
        .then(data=>{
            returnable ={
                message : "location type has been created"
            }
        })
        .catch(e=>{
            return returnable ={
                message: "error at create new location type"
            }
        })
        return returnable
    }

    async list(){
        let returnable
        await db('type_location')
        .select('*')
        .then(data=>{
            returnable = data
        })
        .catch(e=>{
            returnable={error : e}
        })
        return returnable
    }

    async delete (id:number){
        let returnable 
        await db('type_location')
        .where('id',id)
        .delete()
        .then(data =>{
            returnable = {
                message : "location type has been deleted"
            }
        })
        .catch(e=>{
            returnable = {
                message : "error when trying to delete a location type"
            }
        })
        return returnable
    }

}

export default TypeLocationModel