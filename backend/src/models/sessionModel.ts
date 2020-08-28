import db from "../database/connection";
import knex from "knex";

interface authTokens {
  userId: string;
  authToken: string;
  sessionToken: string;
}

interface responseObject {
  message: string;
}

export default class SessionModel {
  /*
    Saves section and user tokens to verify that the section is valid
  */

  async create(userToken: authTokens) {
    let response: responseObject = {
      message: "Sessão Autenicada Com Sucesso",
    };
    const insertedSession = await db("access").insert({
      "user_id":userToken.userId,
      "auth_token":userToken.authToken,
      "session_token":userToken.sessionToken,
    });
    console.log(insertedSession['rowCount'])
    if (insertedSession['rowCount'] > 0) {
      response.message = "Erro ao Autenticar, Tente Novamente Mais Tarde";
    }
    return response;
  }

  async renew(userToken: authTokens) {
    const updatedSession = await db.raw("update `access` set `access`.`expires_at` = `expires_at` + '5 minutes'::interval where `access`.`username` = "+userToken.userId+"and `access`.`auth_token` = "+userToken.authToken+" and `access`.`session_token` = "+userToken.sessionToken+" and datetime('now','localtime') between `access`.`access_at` and `access`.`expires_at`")
    
    if(updatedSession.length > 0){
      
    }else{

    }
  }

  async verify(userToken: authTokens) {
    let is_valid: boolean
    const session = await db("access")
      .whereRaw("`access`.`username` = ?", userToken.userId)
      .whereRaw("`access`.`auth_token` = ?", userToken.authToken)
      .whereRaw("`access`.`session_token` = ?", userToken.sessionToken)
      .whereRaw(
        "datetime('now','localtime') between `access`.`access_at` and `access`.`expires_at`"
      );
    
    if(session.length > 0 ){
        is_valid = true
    }else{
        is_valid = false
    }
    return is_valid
  }
}
