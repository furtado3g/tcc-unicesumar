import React from "react";
import './styles.css'

function Panel(props: any) {
  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">{props.title}</div>
        </div>
        <div className="panel-body">{props.children}</div>
      </div>
    </>
  );
}

export default Panel;
