import db from "../database/connection";
import moment from "moment";

interface authTokens {
  userId: string;
  authToken: any;
  sessionToken: any;
}

interface responseObject {
  message: string;
  token: any;
}

export default class SessionModel {
  /*
    Saves section and user tokens to verify that the section is valid
  */

  async create(userToken: authTokens) {
    let response: responseObject = {
      message: "Sessão autenticada com sucesso",
      token: {},
    };
    const insertedSession = await db("sessions")
      .insert({
        user_id: userToken.userId,
        auth_token: userToken.authToken,
        session_token: userToken.sessionToken,
      })
      .then((data) => {
        response.token = userToken;
      })
      .catch((e) => {
        response.message = "Erro de autenticação! Tente novamente mais tarde.";
      });
    return response;
  }

  async renew(userToken: authTokens) {
    let returnable;
    const getValues = await db("sessions")
      .where("session_token", userToken.sessionToken)
      .select("expires_at");
    if (moment(getValues[0].expires_at) < moment()) {
      return {
        message: "Token inválido",
      };
    }
    const updatedSession = await db("sessions")
      .where("session_token", userToken.sessionToken)
      .where("expires_at", ">=", moment(getValues[0].expires_at).toISOString())
      .update({
        expires_at: moment(getValues[0].expires_at)
          .add(5, "minutes")
          .toISOString(),
      })
      .then((data) => {
        console.log(data);
        returnable = { status: "updated" };
      })
      .catch((e) => {
        returnable = { status: e };
      });
    return returnable;
  }

  async verify(sessionToken: any) {
    let returnable  = {
      message: "Token inválido",
      is_valid: false,
    };
    let is_valid: boolean;
    await db("sessions")
    .where("session_token", sessionToken)
    .select("expires_at")
    .then(data=>{
      if (moment(data[0].expires_at) > moment()) {
        returnable =  {
          message: "Token válido",
          is_valid: true,
        };
      } else {
        returnable = {
          message: "Token inválido",
          is_valid: false,
        };
      }
    })
    .catch(e=>{
      returnable = {
        message: "Erro durante a transação de informações",
        is_valid: false,
      };
      console.log(e)
      
    })
    return returnable
  }
}
