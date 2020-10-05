import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import moment from 'moment'
import toastr from 'toastr'
import "./styles.css";
function NewUser() {
  const sessionToken = localStorage.getItem("sessionToken")
  const expires_at = localStorage.getItem("expires_at")
  const [loggedUsername, loggedUsernameState] = useState("");
  const [name, nameState] = useState("");
  const [username, usernameState] = useState("");
  const [password, passwordState] = useState("");
  const [redundacy, redundacyState] = useState("");
  const [email, emailState] = useState("");
  const [userType, userTypeState] = useState("");

  async function handleWithPageLoad() {
    const requestData = {
      url: "http://localhost:3333/user/" + localStorage.getItem("user_id"),
      options: {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    };
    await fetch(requestData.url, requestData.options)
      .then((data) => {
        return data.json();
      })
      .then((data: any) => {
        const { name } = data;
        loggedUsernameState(name);
      })
      .catch((e) => {
        loggedUsernameState("Admin");
      });
  }

  async function handleWithSubmit() {
    const token:any  = localStorage.getItem("sessionToken")
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
          authorization: token
        }
      },
    };
    if (password !== redundacy) {
      alert("Senhas Não Coincidem");
    }
    await fetch(data.url, data.options)
      .then(async (data) => {
        const { message, error } = await data.json()
        if (data.status >= 200 && data.status < 300) {
          toastr.success(message)
        } else {
          toastr.error(error || message)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
  
  useEffect(()=>{
    if (sessionToken == null) {
      toastr.options = {
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": 5000,
        "timeOut": 5000,
      }
      toastr.error("É necessario estar logado Para obter acesso ao Sistema")
      window.location.replace('/')
    }
    if (moment(expires_at) < moment()) {
      toastr.options = {
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "progressBar": false,
        "showDuration": 5000,
        "timeOut": 5000,
      }
      toastr.warning("Sua Sessão expirou")
      window.location.replace('/')
    }
  },[])

  return (
    <>
      <div className="container-admin">
        <Sidebar />
        <Panel title={loggedUsername}>
          <PanelSidebar>
            <PanelSidebarItem>
              <i className="fas fa-user-plus"></i>
              Novo Usuario
            </PanelSidebarItem>
          </PanelSidebar>
          <div className="panel-content">
            <div className="row">
              <h2 className="page-name">Novo Usuario</h2>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={(e) => nameState(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="userName">Login</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  onChange={(e) => usernameState(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  onChange={(e) => emailState(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => passwordState(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="c_password">Confirmar Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="c_password"
                  onChange={(e) => redundacyState(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <select
                  className="form-control"
                  id="userType"
                  onChange={(e) => userTypeState(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="1">Coordenador</option>
                  <option value="2">Professor</option>
                  <option value="3">Laboratorista</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <button className="btn btn-success" onClick={handleWithSubmit}>
                  Salvar Usuario
                </button>
                <Link to="/admin">
                  <button className="btn btn-danger">Voltar</button>
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

export default NewUser;
