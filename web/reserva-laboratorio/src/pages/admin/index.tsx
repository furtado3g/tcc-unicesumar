import React from "react";
import {useToasts} from 'react-toast-notifications'
import { useHistory } from "react-router-dom";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import moment from 'moment'
import "./styles.css";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";

function Admin() {
  const sessionToken = localStorage.getItem("sessionToken")
  const expires_at = localStorage.getItem("expires_at")
  const {addToast} = useToasts();
  const History = useHistory();
  if(sessionToken == null){
    addToast("Você precisa estar logado para obter acesso ao sistema", {appearance: 'warning', autoDismiss: true})
    History.push('/')
  }
  if(moment(expires_at) < moment()){
    addToast("Sessão expirada", {appearance: 'warning', autoDismiss: true})
    History.push('/')
  }
  return (
    <>
      <div className="container-admin">
        <Sidebar />
        <Panel title="Painel Administrativo">
          <AdminPanelSidebar/>
        </Panel>
      </div>
    </>
  );
}

export default Admin;
