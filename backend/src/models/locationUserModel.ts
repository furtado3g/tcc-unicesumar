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
                error : "Relacionamento já existente"
            }            
        }
        await db('user_location')
        .insert(locationUser)
        .then(data=>{
            returnable = { message : "Espaço atribuído ao usuário" }
        })
        .catch(e=>{
            returnable = { error : "Erro ao atribuir relacionamento"}
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
                error : "Relacionamento inexistente"
            }
        }
        const deletedRows = await db('user_location')
        .where("id",id)
        .delete().then(data=>{
            returnable = {message : "Associação excluída com sucesso"}
        }).catch(err=>{
            returnable = {error : "Erro ao excluir associação"}
        })
        return returnable
    }

    async listPerUser(id:string){
        let returnable
        const listOfUserLocatios = await db('user_location')
        .where('user_id',id)
        .select('*')
        .then(data=>{
            returnable = data
        })
        .catch(e=>{
            returnable = {error:"Erro ao buscar lista de associação de usuários e espaços"}
        })
        return returnable
    }
}

export default LocationUserModel