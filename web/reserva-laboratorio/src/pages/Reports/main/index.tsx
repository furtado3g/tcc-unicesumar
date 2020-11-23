import React from "react";
import Panel from "../../../components/panel";
import PanelSidebar from "../../../components/panel-sidebar";
import PanelSidebarItem from "../../../components/panel-sidebar-item";
import Sidebar from "../../../components/sidebar/index";
import A from "../../../components/anchor"
function Reports() {
  
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Relatórios">
        <PanelSidebar>
          <PanelSidebarItem>
            <A color="whitesmoke" module="reports" url="users">
              <i className="fas fa-users"></i>
              Por Usuário
            </A>
          </PanelSidebarItem>
        </PanelSidebar>
      </Panel>
    </div>
  );
}
export default Reports;
