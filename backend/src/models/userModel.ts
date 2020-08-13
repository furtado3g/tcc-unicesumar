import db from "../database/connection";

interface userInterface{
    name:string;
    userName:string;
    password:string;
    last_password:string;
}

export default class UserModel{
    async create(user:userInterface){
        const insertedRows = await db.insert(user)
        return insertedRows
    }

}