import React, { useEffect, useState } from 'react'
import './styles.css'
import Sidebar from '../../components/sidebar'
import Panel from '../../components/panel'
import PanelSidebar from '../../components/panel-sidebar'
import PanelSidebarItem from '../../components/panel-sidebar-item'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

function EditMyInfo() {
    const token:any  = localStorage.getItem("sessionToken")
    const user :any  = localStorage.getItem("userId")
    
    const {addToast} = useToasts()
    const [name, nameState] = useState('')
    const [email, emailState] = useState('')
    const [username, usernameState] = useState('')
    const [user_type, user_typeState] = useState('')

    
    async function handleWithSubmit(){
        const data = {
            url : "http://localhost:3333/user",
            options: {
                method : "put",
                body : JSON.stringify({
                    name,
                    email,
                    username,
                    user_type
                }),
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: token,
                    userId : user
                }
            }
        }
        await fetch(data.url, data.options)
        .then((response) =>{
            return response.json();
        })
        .then((res)=>{
            addToast(res.message,{appearance: 'success', autoDismiss: true});
        })
        .catch((err)=>{console.log(err)})
    }

    async function handleWithPageLoad() {
        const data = {
            url : "http://localhost:3333/user/"+user,
            options: {
                method : "get",
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: token,
                    userId : user
                }
            }
        }
        await fetch (data.url, data.options)
        .then((response) =>{
            return response.json()
        })
        .then(result =>{
            const {name,username,email,user_type} = result
            nameState(name)
            emailState(email)
            usernameState(username)
            user_typeState(user_type)
        })
    }

    useEffect(()=>{
        handleWithPageLoad()
    },['loading'])

    return (
        <div className="container-info">
            <Sidebar />
            <Panel title="Editar Informações">
                <PanelSidebar>
                    <PanelSidebarItem>
                        <Link to="/changePassword">
                            <i className="fas fa-key"></i>
                            Mudar Senha
                        </Link>
                    </PanelSidebarItem>
                    <PanelSidebarItem id="active">
                        <Link to="/editMyInfo" >
                            <i className="fas fa-file-alt"></i>
                            Editar informações
                        </Link>
                    </PanelSidebarItem>
                </PanelSidebar>
                <div className="panel-content">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="name">Nome</label>
                            <input 
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={e => nameState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="username">Usuário</label>
                            <input 
                                type="username"
                                value={username}
                                disabled
                                className="form-control"
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                value={email}
                                disabled
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <label htmlFor="email">Tipo de Usuário</label>
                            <select
                            className="form-control"
                            id="userType"
                            value={user_type}
                            disabled
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
                            <button 
                                className="btn btn-success"
                                onClick={handleWithSubmit}
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default EditMyInfo