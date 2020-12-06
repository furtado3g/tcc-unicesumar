import createToken from "../util/createToken"
import SessionModel from "../models/sessionModel"
import {Request,Response} from 'express'
import db from "../database/connection"

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
        const data = await db('sessions').select('expires_at').where('session_token','=',sessionToken)
        const returnableToken = {
            authToken : authToken,
            sessionToken : sessionToken,
            expires_at : data[0].expires_at
        }
        console.log(insertedSession)
        if(!insertedSession.message.includes('Erro')){
            return returnableToken
        }else{
            return {
                message : "Erro ao persistir sessão no banco"
            }
        }
    }

    async extendSession(req:Request,res:Response){
        const {userId,authToken} = req.body
        const {authorization}= req.headers
        const model = new SessionModel()
        console.log(authorization)
        return res.json(await model.renew({
            "userId" :userId,
            "sessionToken" : authorization,
            "authToken":authToken
        }))
    }
    
}