import React from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import "./styles.css";
function Admin() {
  const sessionToken = localStorage.getItem("sessionToken")
  const expires_at = localStorage.getItem("expires_at")
  if(sessionToken == null) window.location.replace('/')
  return (
    <>
      <div className="container-admin">
        <Sidebar />
        <Panel title="Painel Administrativo">
          <PanelSidebar>
            <PanelSidebarItem>
              <Link to="/user/add">
                <i className="fas fa-user-plus"></i>
                Novo Usuario
              </Link>
            </PanelSidebarItem>
          </PanelSidebar>
        </Panel>
      </div>
    </>
  );
}

export default Admin;
