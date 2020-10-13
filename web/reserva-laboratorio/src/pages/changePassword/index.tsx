import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import Panel from '../../components/panel';
import Sidebar from '../../components/sidebar'
import PanelSidebar from '../../components/panel-sidebar'
import PanelSidebarItem from '../../components/panel-sidebar-item'
function ChangePassword(props: any) {

    const [actualPassword, actualPasswordState] = useState('')
    const [newPassword, newPasswordState] = useState('')
    const [redundacy, redundacyState] = useState('')

    const sessionToken = localStorage.getItem("sessionToken")
    const expires_at = localStorage.getItem("expires_at")
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

    async function handleWithSubmit() {
        const token: any = localStorage.getItem("sessionToken")
        const user: any = localStorage.getItem("userId")
        if (actualPassword === '' || newPassword === '' || redundacy === '') 
            return alert("Campos Obrigatórios estão em branco")
        if (newPassword !== redundacy) return alert("As senhas não coincidem")
        if (actualPassword === newPassword) return alert("A nova senha não pode ser identica a atual")
        const data = {
            url: "http://localhost:3333/user/changePassword",
            options: {
                method: "PUT",
                body: JSON.stringify({ 
                    actualPassword:actualPassword,
                    password : newPassword 
                }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                    userId: user
                }
            }
        }
        await fetch(data.url, data.options)
            .then(async data => {
                const {message} = await data.json()
                return message
            })
            .then(response=>{
                alert(response)
            })
            .catch(e => alert(e))
    }
    return (
        <div className="container-admin">
            <Sidebar />
            <Panel title="Mudar Senha">
                <PanelSidebar>
                    <PanelSidebarItem id="active">
                        <Link to="/changePassword">
                            <i className="fas fa-key"></i>
                            Mudar Senha
                        </Link>
                    </PanelSidebarItem>
                    <PanelSidebarItem >
                        <Link to="/editMyInfo" >
                            <i className="fas fa-file-alt"></i>
                            Editar informações
                        </Link>
                    </PanelSidebarItem>
                </PanelSidebar>
                <div className="panel-content">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="actualPassword">Senha Atual</label>
                            <input
                                type="password"
                                className="form-control"
                                id="actualPassword"
                                onChange={e => actualPasswordState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="actualPassword">Nova Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                onChange={e => newPasswordState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="actualPassword">Repitir Nova Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                onChange={e => redundacyState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div id="panel-footer" className="col-12">
                            <button
                                className="btn btn-success"
                                onClick={handleWithSubmit}
                            >
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default ChangePassword