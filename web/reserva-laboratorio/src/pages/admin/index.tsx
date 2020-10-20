import React from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import moment from 'moment'
import "./styles.css";
function Admin() {
  const sessionToken = localStorage.getItem("sessionToken")
  const expires_at = localStorage.getItem("expires_at")
  if(sessionToken == null) window.location.replace('/')
  if(moment(expires_at) < moment()) window.location.replace('/')
  
  return (
    <>
      <div className="container-admin">
        <Sidebar />
        <Panel title="Painel Administrativo">
          <PanelSidebar>
            <PanelSidebarItem>
              <Link to="/user/add">
                <i className="fas fa-user-plus"></i>
                Novo Usuário
              </Link>
            </PanelSidebarItem>

            <PanelSidebarItem>
              <Link to="/user/edit">
              <i className="fas fa-user-edit"></i>
                Editar Usuário
              </Link>
            </PanelSidebarItem>
            <PanelSidebarItem>
              <Link to="/location/add">
              <i className="fas fa-map-marker-alt"></i>
                Cadastrar Espaço
              </Link>
            </PanelSidebarItem>
            <PanelSidebarItem>
              <Link to="/location/edit">
              <i className="fas fa-pen-square"></i>
                Editar Espaço
              </Link>
            </PanelSidebarItem>
          </PanelSidebar>
        </Panel>
      </div>
    </>
  );
}

export default Admin;
