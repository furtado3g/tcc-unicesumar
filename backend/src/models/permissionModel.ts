import db from "../database/connection";

class PermissionModel{

    async assign(idUser:number,url:string){
        const tp_user = await this.getUserType(idUser);
        const id_permission = await this.getEndPointId(url);
        const insertedRows = await db('type_user_permisions').insert({tp_user,id_permission})
        if(insertedRows.length > 0){
            return {insertedRows}
        }else{
            return {error:true}
        }
    }

    async verify(idUser:number,idPermission:number){
        const result = await db('type_user_permisions')
            .where("id_permission",idPermission)
            .join("users","users.tp_user","type_user_permisions.tp_user")
            .where("users.id",idUser)
            .select('*')
        if(result.length > 0){
            return {
                granted: true,
                result : result
            }
        }else{
            return {
                granted: false
            }
        }
    }

    async newEndPoint(url:string){
        const insertedRows = await db('permissions')
        .insert(
            {"endpoint":url}
        );
        console.log(insertedRows)
        if(insertedRows.length > 0){
            return {insertedRows}
        }else{
            return {error:true}
        }
    }

    async newUserType(description:string){
        const insertedRows = await db('user_type').insert({description})
        if(insertedRows.length > 0){
            return{insertedRows}
        }else{
            return{error:true}
        }
    }

    async getUserType(id:number){
        const result = await db('users').where('id',id).select('users.tp_user')
        return result
    }

    async getEndPointId(url:string){
        const result = await db('permission').where('endpoint',url).select('id')
        return result
    }

}

export default  PermissionModel;