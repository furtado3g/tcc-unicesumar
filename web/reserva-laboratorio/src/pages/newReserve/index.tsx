import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import moment from 'moment'
import toastr from 'toastr'
import "./styles.css";

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
