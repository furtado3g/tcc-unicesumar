import db from "../database/connection"

interface ILocation{
    "type":string,
    "comments":string,
    "capacity":number
}

class LocationModel{
    async insert(location:ILocation){
        let returnable
        const insertedRows = await db('locations').insert(location)
        .then(data=>{
            returnable = {"message":"Place successfully registered"}
        }).catch(err=>{
            returnable = {"error" : "Error deleting location"}
        })
        return returnable
    }

    async update(location:ILocation,locationId:number){
        let returnable
        const updatedRows = await db('locations')
        .where('id',locationId)
        .update(location)
        .then(data=>{
            returnable = {message :"Location changed successfully"}
        }).catch(err=>{
            returnable =  {"error":"Error updating location description"}
        })
        return  returnable
    }
    
    async delete(locationId:number){
        let returnable
        const deletedRows = await db('locations')
        .where('id',locationId) 
        .delete()
        .then(data=>{
            returnable = {"message":"Location successfully deleted"}
        }).catch(err=>{
            returnable = {"error" : "Error deleting location"}
        })
        return  returnable
    }

    async getList(sql:string){
        const response = await db.raw(sql)
        return response
    }

    async detail(locationId:any){
        return await db('locations')
            .where('id',locationId)
            .select('*')
    }

    async search(term : any, type : any){
        console.log(term)
        console.log(type)
        
        if((term != null || term != undefined || term != '')&&
           (type == null || type == undefined || type == '')){
           return await db('locations')
                .where('comments','like','%'+term+'%')
                .select('*')
                .catch(err => {
                    console.log('A');
                })
        }else if((type == null || type == undefined || type == '')&&
                 (term != null || term != undefined || term != '')){
            return await db('locations')
                .where('type',type)
                .select('*')
                .catch(err => {
                    console.log('b');
                })
        }else if((type == null || type == undefined || type == '')&&
                 (term == null || term == undefined || term == '')){
            return await db('locations')
                .select('*')
                .catch(err => {
                    console.log('c');
                })
        }else if((type != null || type != undefined || type != '')&&
                 (term != null || term != undefined || term != '')){
            return await db('locations')
                .where('comments','like','%'+term+'%')
                .where('type',type)
                .select('*')
                .catch(err => {
                    console.log('D');
                })
        }
    }
}

export default LocationModel