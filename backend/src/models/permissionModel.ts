import db from "../database/connection";

class PermissionModel{

    async assign(idUser:number,url:string){
        const tp_user = await this.getUserType(idUser);
        const id_permission = await this.getEndPointId(url);
        let returnable 
        const insertedRows = await db('type_user_permisions')
        .insert({
            id_permission : id_permission[0].id,
            tp_user : tp_user[0].user_type
        })
        .then((data)=>{
            console.log(data.values)
            returnable = data
        }).catch((e)=>{
            returnable = {error:e}
        })
        return returnable
    }

    async verify(idUser:number,idPermission:number){
        let returnable
        const result = await db('type_user_permisions')
        .where("id_permission",idPermission)
        .join("users","users.user_type","type_user_permisions.tp_user")
        .where("users.id",idUser)
        .select('*')
        .then(data=>{
            returnable =  {
                granted: true,
                result : result
            }

        })
        .catch(e=>{
            returnable = {
                granted: false
            }
        })
        return returnable
    }

    async newEndPoint(url:string){
        let returnable
        const insertedRows = await db('permissions')
        .insert(
            {"endpoint":url}
        ).then(selectedTodo => {
            console.log(selectedTodo)
            returnable = {message:"Novo endpoint criado com sucesso"}
        })
        .catch(e=>{
            returnable = {error:e}
        })
        return returnable
    }

    async newUserType(description:string){
        let returnable
        const insertedRows = await db('user_type')
        .insert({description})
        .then(()=>{ returnable ={message:"Novo tipo de usuário cadastrado com sucesso"} })
        .catch((e)=>{returnable= {error:e}})
        return returnable
    }

    async listUserPermissions(idUser:any){
        const result = await db('type_user_permisions')
        .join("users","users.user_type","type_user_permisions.tp_user")
        .join("permissions","permissions.id","type_user_permisions.id_permission")
        .where("users.id",idUser)
        .select(
            'permissions.id',
            'permissions.endpoint'
        )
        return result
    }

    private async getUserType(id:number){
        const result = await db('users').where('id',id).select('users.user_type')
        return result
    }

    private async getEndPointId(url:string){
        const result = await db('permissions').where('endpoint',url).select('id')
        return result
    }

}

export default  PermissionModel;