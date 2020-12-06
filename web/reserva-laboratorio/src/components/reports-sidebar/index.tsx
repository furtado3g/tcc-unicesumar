import React from 'react'
import PanelSidebar from '../panel-sidebar'
import PanelSidebarItem from '../panel-sidebar-item'
import A from '../anchor'
function ReportsSidebar() {
    return (
        <PanelSidebar>
            <PanelSidebarItem>
                <A color="whitesmoke" module="reports" url="users">
                    <i className="fas fa-users"></i>
                Por Usuário
            </A>
            </PanelSidebarItem>
            <PanelSidebarItem>
                <A color="whitesmoke" module="reports" url="locations">
                    <i className="fas fa-location-arrow"></i>
                Por Local
            </A>
            </PanelSidebarItem>
        </PanelSidebar>
    )
}

export default ReportsSidebar