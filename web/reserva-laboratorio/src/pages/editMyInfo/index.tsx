import React from 'react'
import './styles.css'
import Sidebar from '../../components/sidebar'
import Panel from '../../components/panel'
import PanelSidebar from '../../components/panel-sidebar'
import PanelSidebarItem from '../../components/panel-sidebar-item'
import { Link } from 'react-router-dom'
function EditMyInfo() {
    const token:any  = localStorage.getItem("sessionToken")
    const user :any  = localStorage.getItem("userId")

    async function handleWithPageLoad(){
        const data = {
            url : "http://localhost:3333/",
            options: {
                method : "put",
                body : JSON.stringify({}),
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: token,
                    userId : user
                }
            }
        }

    }

    return (
        <div className="container">
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
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="username">Usuario</label>
                            <input 
                                type="username"
                                disabled
                                className="form-control"
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                disabled
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-success">
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