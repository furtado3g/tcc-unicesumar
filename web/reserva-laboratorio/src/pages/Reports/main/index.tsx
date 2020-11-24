import React from "react";
import Panel from "../../../components/panel";
import Sidebar from "../../../components/sidebar/index";
import ReportsSidebar from '../../../components/reports-sidebar'
function Reports() {
  
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Relatórios">
        <ReportsSidebar/>
      </Panel>
    </div>
  );
}
export default Reports;
