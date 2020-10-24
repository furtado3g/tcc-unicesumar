import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar/index";
import moment from "moment";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
function EditUser() {
  const sessionToken = localStorage.getItem("sessionToken");
  const expires_at = localStorage.getItem("expires_at");
  const user: any = localStorage.getItem("userId");
  const [name, nameState] = useState("");
  const [username, usernameState] = useState("");
  const [password, passwordState] = useState("");
  const [redundacy, redundacyState] = useState("");
  const [email, emailState] = useState("");
  const [userType, userTypeState] = useState("");
  const [response, responseTypeState] = useState("");
  let Options : {}
  async function handleWithPageLoad() {
    const data = {
      url: "http://localhost:3333/users",
      options: {
        method: "get",
        headers: {
          authorization: sessionToken || "",
          userId: user,
        },
      },
    };
    await fetch(data.url, data.options)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        response.map((user: any) => {
          let element = new Option(user.id + "-" + user.name, user.id);
          document.querySelector("#userList")?.appendChild(element);
        });
      });
  }

  async function handleWithAlerts() {
    document.querySelector(".alert")?.classList.toggle("hidden");
  }

  async function handleWithSubmit() {
    const token: any = localStorage.getItem("sessionToken");
    const user: any = localStorage.getItem("userId");
    const data = {
      url: "http://localhost:3333/user/",
      options: {
        method: "post",
        body: JSON.stringify({
          name,
          username,
          password,
          email,
          userType,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          userId: user,
        },
      },
    };
    if (password !== redundacy) {
      return responseTypeState("Senhas não correspondem");
    }
    await fetch(data.url, data.options)
      .then(async (data) => {
        const { message, error } = await data.json();
        if (data.status >= 200 && data.status < 300) {
          handleWithAlerts();
          responseTypeState(message);
          setTimeout(() => {
            window.location.replace("/admin");
          }, 5000);
        } else {
          handleWithAlerts();
          responseTypeState(error || message);
          setTimeout(() => {
            handleWithAlerts();
          }, 5000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleWithUserSelected(userId: string) {
    const data = {
      url: "http://localhost:3333/user/" + userId,
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
        alert(user_type);
      });
  }

  useEffect(() => {
    handleWithPageLoad();
    if (sessionToken == null) {
      alert("É necessário estar logado para obter acesso ao sistema");
      window.location.replace("/");
    }
    if (moment(expires_at) < moment()) {
      alert("Sessão expirada");
      window.location.replace("/");
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
            <div className="col-12">
              <label htmlFor="userList">Usuário</label>
              <select
                id="userList"
                className="form-control"
                onChange={(e) => handleWithUserSelected(e.target.value)}
              >
                <option value="">Selecione</option>
              </select>
            </div>
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
              <Link to="/admin">
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
