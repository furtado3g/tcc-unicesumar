import db from "../database/connection";

class PermissionModel{

    async assign(idUser:number,url:string){
        const tp_user = await this.getUserType(idUser);
        const id_permission = await this.getEndPointId(url);
        let returnable 
        const permissionExists = await db('type_user_permisions')
        .where('tp_user',tp_user[0].user_type)
        .where('id_permission',id_permission[0].id)
        if(permissionExists[0]) return {error:"Permissão já atribuída"};
        const insertedRows = await db('type_user_permisions')
        .insert({
            id_permission : id_permission[0].id,
            tp_user : tp_user[0].user_type
        })
        .then((data)=>{
            returnable = data
        }).catch((e)=>{
            returnable = {error:e}
        })
        return returnable
    }

    async verify(idUser:any,url:any){
        let returnable
        const endpoint = await db('permissions')
        .where('endpoint',url)
        .select('id')
        if(!endpoint[0]){
            return {
                error : "Endpoint não cadastrado"
            }
        }
        const user = await db.from('users')
        .where('id',idUser)
        .select('*')
        if(!endpoint[0]){
            return{
                "error" : "Usuário inexistente"
            }
        }
        const result = await db('type_user_permisions')
        .where("id_permission",endpoint[0].id)
        .where('tp_user',user[0].user_type)
        .select('*')
        .then(data=>{
            returnable =  {
                granted: true,
                result : data
            }

        })
        .catch(e=>{
            console.log(e)
            returnable = {
                granted: true
            }
        })
        return returnable
    }

    async newEndPoint(url:string){
        let returnable
        const endpointExists = await db('permissions')
        .where('endpoint',url)
        .select('*')
        if(endpointExists[0]){
            return {
                error : "Endpoint já cadastrado"
            }
        }
        const insertedRows = await db('permissions')
        .insert(
            {"endpoint":url}
        ).then(selectedTodo => {
            console.log(selectedTodo)
            returnable = {message:"Endpoint cadastrado com sucesso"}
        })
        .catch(e=>{
            returnable = {error:e}
        })
        return returnable
    }

    async newUserType(description:string){
        let returnable
        const userTypeExists = await db('user_type')
        .where('description',description)
        .select('*')
        if(userTypeExists[0]){
            return {
                error : "Tipo de usuário já cadastrado"
            }
        }
        const insertedRows = await db('user_type')
        .insert({description})
        .then(()=>{ returnable ={message:"Tipo de usuário cadastrado com sucesso"} })
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
            'permissions.endpoint',
            'users.name'
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