import db from "../database/connection";

class TypeLocationModel{
    
    async create(description:string){
        let returnable
        const typeExists = await db('type_location')
        .select('*')
        .where('description',description)
        if(typeExists[0]){
            return {
                message : "Tipo de espaço já cadastrado"
            }
        }
        await db('type_location')
        .insert({description})
        .then(data=>{
            returnable ={
                message : "Tipo de espaço cadastrado"
            }
        })
        .catch(e=>{
            return returnable ={
                message: "Erro ao criar novo tipo de espaço"
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

    async delete (id:string){
        let returnable 
        const idExists = await db('type_location')
        .where('id',id)
        .select('*')
        console.log(idExists)
        if(!idExists[0]){
            return {
                message : "Espaço não cadastrado"
            }
        }
        await db('type_location')
        .where('id',id)
        .delete()
        .then(data =>{
            returnable = {
                message : "Tipo de espaço excluído com sucesso"
            }
        })
        .catch(e=>{
            returnable = {
                message : "Erro ao excluir tipo de espaço"
            }
        })
        return returnable
    }

}

export default TypeLocationModel