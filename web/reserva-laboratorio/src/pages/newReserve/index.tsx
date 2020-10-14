import React, { useEffect } from "react";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar/index";
function NewReserve() {
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Reservas">
        <PanelSidebar>
          <PanelSidebarItem>
            <i className="far fa-calendar-check"></i>
            Realizar Agendamento
          </PanelSidebarItem>
        </PanelSidebar>
      </Panel>
    </div>
  );
}
export default NewReserve;
