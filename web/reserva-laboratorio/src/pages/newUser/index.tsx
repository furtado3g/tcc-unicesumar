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
  const [response, responseTypeState] = useState("");

  async function handleWithAlerts(){
    document.querySelector(".alert")?.classList.toggle('hidden')
  }

  async function handleWithSubmit() {
    const token:any  = localStorage.getItem("sessionToken")
    const user :any  = localStorage.getItem("userId")
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
          'Content-Type' : 'application/json',
          authorization: token,
          userId : user
        }
      },
    };
    if (password !== redundacy) {
      return responseTypeState("Senhas Não Coincidem")
    }
    await fetch(data.url, data.options)
      .then(async (data) => {
        const { message, error } = await data.json()
        if (data.status >= 200 && data.status < 300) {
          handleWithAlerts()
          responseTypeState(message)
          setTimeout(()=>{
            window.location.replace('/admin')
          },5000)
        } else {
          handleWithAlerts()
          responseTypeState(error || message)
          setTimeout(()=>{
            handleWithAlerts()
          },5000)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
  
  useEffect(()=>{
    if (sessionToken == null) {
      alert("É necessario estar logado Para obter acesso ao Sistema")
      window.location.replace('/')
    }
    if (moment(expires_at) < moment()) {
      alert("Sua Sessão expirou")
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
              <div className="col-12">
                <div className="alert hidden">
                  {response}
                </div>
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
