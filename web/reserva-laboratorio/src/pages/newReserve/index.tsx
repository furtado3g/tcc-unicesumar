import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import "./styles.css";

function NewReserve() {
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Reservas">
        <PanelSidebar>
          <PanelSidebarItem>
            <Link to="/user/add">
              <i className="fas fa-user-plus"></i>
              Novo Usuario
            </Link>
          </PanelSidebarItem>
          <PanelSidebarItem>
            <i className="fas fa-user-plus"></i>
              Editar Usuário
            </PanelSidebarItem>
          <PanelSidebarItem id="active">
            <i className="fas fa-plus-circle"></i>
              Cadastrar Local
            </PanelSidebarItem>
        </PanelSidebar>
      </Panel>
    </div>
  );
}
export default NewReserve;
