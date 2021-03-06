import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar/index";
import moment from "moment";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import { baseUrl } from '../../config/url.json'

function EditUser() {
  const sessionToken = localStorage.getItem("sessionToken");
  const expires_at = localStorage.getItem("expires_at");
  const user: any = localStorage.getItem("userId");
  const [name, nameState] = useState("");
  const [username, usernameState] = useState("");
  const [password, passwordState] = useState("");
  const [email, emailState] = useState("");
  const [userType, userTypeState] = useState("");
  const [response, responseTypeState] = useState("");
  const { id }:any = useParams(); // eslint-disable-line no-eval
  const { addToast } = useToasts()
  const History = useHistory();

  async function handleWithPageLoad() {
    handleWithUserSelected(id)
  }

  async function handleWithAlerts() {
    document.querySelector(".alert")?.classList.toggle("hidden");
  }

  function isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  async function handleWithSubmit() {
    const token: any = localStorage.getItem("sessionToken");
    const user: any = localStorage.getItem("userId");
    const data = {
      url: `${baseUrl}/user/`,
      options: {
        method: "put",
        body: JSON.stringify({
          name,
          username,
          email,
          userid: id,
          type: userType,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          userId: user,
        },
      },
    };
    await fetch(data.url, data.options)
      .then(async (data) => {
        const { message, error } = await data.json();
        if (data.status >= 200 && data.status < 300) {
          handleWithAlerts();
          responseTypeState(message);
          setTimeout(() => {
            History.go(-1)
          }, 5000);
        } else {
          handleWithAlerts();
          responseTypeState(error || message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleWithUserSelected(userId: string) {
    const data = {
      url: `${baseUrl}/user/` + userId,
      options: {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionToken || "",
          userId: user,
        },
      },
    };
    await fetch(data.url, data.options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const { name, username, email, user_type } = result;
        nameState(name);
        emailState(email);
        usernameState(username);
        userTypeState(user_type);
      });
  }

  useEffect(() => {
    handleWithPageLoad();
    if (sessionToken == null) {
      addToast("É necessário estar logado para obter acesso ao sistema", { appearance: 'warning', autoDismiss: true });
      History.push("/")
    }
    if (moment(expires_at) < moment()) {
      addToast("Sessão expirada", { appearance: 'warning', autoDismiss: true });
      History.push("/")
    }
  }, ["loading"]);

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="editUser" />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Editar Usuário</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => nameState(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="userName">Login</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={username}
                onChange={(e) => usernameState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="email">Email (Institucional)</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => emailState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="userType">Tipo de Usuário</label>
              <select
                className="form-control"
                id="userType"
                value={userType}
                onChange={(e) => userTypeState(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="1">Coordenador</option>
                <option value="2">Professor</option>
                <option value="3">Gestor de Espaço</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="alert hidden">{response}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-success" onClick={handleWithSubmit}>
                Salvar
              </button>
              <Link to="/users">
                <button className="btn btn-danger">Voltar</button>
              </Link>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
export default EditUser;
