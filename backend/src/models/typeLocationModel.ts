import db from "../database/connection";

class TypeLocationModel{
    
    async create(description:string){
        return await db('type_location').insert({description})
    }

    async list(){
        return await db('type_location').select('*')
    }

    async delete (id:number){
        return await db('type_location').where('id',id).delete()
    }

}

export default TypeLocationModel