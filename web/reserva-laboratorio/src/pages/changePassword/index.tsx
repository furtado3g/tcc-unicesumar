import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import Panel from '../../components/panel';
import Sidebar from '../../components/sidebar'
import PanelSidebar from '../../components/panel-sidebar'
import PanelSidebarItem from '../../components/panel-sidebar-item'
import { useToasts } from 'react-toast-notifications'
import {useHistory} from 'react-router-dom'

function ChangePassword(props: any) {

    const [actualPassword, actualPasswordState] = useState('')
    const [newPassword, newPasswordState] = useState('')
    const [redundacy, redundacyState] = useState('')
    const { addToast } = useToasts()
    const History = useHistory();

    const sessionToken = localStorage.getItem("sessionToken")
    const expires_at = localStorage.getItem("expires_at")
    useEffect(()=>{
        if (sessionToken == null) {
          addToast("É necessário estar logado para obter acesso ao Sistema", {appearance: 'warning', autoDismiss: true})
          History.push('/')
        }
        if (moment(expires_at) < moment()) {
          addToast("Sua Sessão expirou", {appearance:'info', autoDismiss: true})
          History.push('/')
        }
      },[])

    async function handleWithSubmit() {
        const token: any = localStorage.getItem("sessionToken")
        const user: any = localStorage.getItem("userId")
        if (actualPassword === '' || newPassword === '' || redundacy === '') 
            return addToast("Campos obrigatórios não preenchidos", {appearance: 'warning', autoDismiss: true})
        if (newPassword !== redundacy) return addToast("As senhas não correspondem", {appearance: 'error', autoDismiss: true})
        if (actualPassword === newPassword) return addToast("Nova senha corresponde a senha atual", {appearance: 'error', autoDismiss: true})
        const data = {
            url: "https://rlab-backend.herokuapp.com/user/changePassword",
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
                addToast(response, {appearance: 'success', autoDismiss: true})
                History.push('/home')
            })
            .catch(e => addToast("Erro na requisição. Por favor tente novamente mais tarde.", {appearance: 'warning', autoDismiss: true}))
    }
    return (
        <div className="container-admin">
            <Sidebar />
            <Panel title="Alterar Senha">
                <PanelSidebar>
                <PanelSidebarItem id="active">
                        <Link to="/changePassword">
                            <i className="fas fa-key"></i>
                            Mudar Senha
                        </Link>
                    </PanelSidebarItem>
                    <PanelSidebarItem>
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
                            <label htmlFor="actualPassword">Confirmar Senha</label>
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