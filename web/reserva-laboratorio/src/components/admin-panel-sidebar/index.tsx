import React, { useEffect } from 'react';
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import { Link } from 'react-router-dom'
function AdminPanelSidebar(props: any) {

  const activePage = props.activePage;

  function handleWithLoadingComponent() {
    document.querySelector('.' + activePage)?.classList.add('active')
  }

  useEffect(() => {
    handleWithLoadingComponent()
  }, ['loading'])

  return (
    <PanelSidebar>
      <PanelSidebarItem className="newUser">
        <Link to="/users/">
          <i className="fas fa-users"></i>
              Usuário
            </Link>
      </PanelSidebarItem>
      <PanelSidebarItem className="newLocation">
        <Link to="/locations">
          <i className="fas fa-map-marker-alt"></i>
              Espaço
            </Link>
      </PanelSidebarItem>
      <PanelSidebarItem className="editLocation">
        <Link to="/locationTypes">
          <i className="fas fa-location-arrow"></i>
              Tipo de Locais
            </Link>
      </PanelSidebarItem>
    </PanelSidebar>
  )
}

export default AdminPanelSidebar;