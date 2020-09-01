import createToken from "../util/createToken"
import db from "../database/connection"
import SessionModel from "../models/sessionModel"
import {Request,Response} from 'express'

export default class sessionController{
    async newSession(userId:string){
        const model = new SessionModel()
        const authToken = await createToken(userId,'auth')
        const sessionToken = await createToken(userId,'session'+ Date.now())
        const token = {
            userId : userId, 
            authToken,
            sessionToken
        }
        const insertedSession = await model.create(token)
        if(insertedSession.message == 'Erro ao Autenticar, Tente Novamente Mais Tarde'){
            return token
        }else{
            return {
                message : "Erro ao persistir sessão no banco"
            }
        }
    }

    async extendSession(req:Request,res:Response){
        const {userId,sessionToken,authToken} = req.body
        return new SessionModel().renew({
            userId,
            sessionToken,
            authToken
        })
    }
}