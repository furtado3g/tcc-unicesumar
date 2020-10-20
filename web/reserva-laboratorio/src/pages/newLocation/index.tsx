import React from 'react'
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";

function NewUser(){

    return (
        <div className="container-admin">
          <Sidebar />
          <Panel title="Administrador">
            <PanelSidebar>
              <PanelSidebarItem>
              <i className="fas fa-map-marker-alt"></i>
                Cadastrar Espaço
              </PanelSidebarItem>
            </PanelSidebar>
          </Panel>
        </div>
      );
}

export default NewUser