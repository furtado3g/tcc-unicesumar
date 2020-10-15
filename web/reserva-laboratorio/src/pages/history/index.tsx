import React, { useEffect } from "react";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar/index";
function History() {
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Histórico">
        <PanelSidebar>
          <PanelSidebarItem>
            <i className="fas fa-book-open"></i>
            Histórico
          </PanelSidebarItem>
        </PanelSidebar>
      </Panel>
    </div>
  );
}
export default History;
