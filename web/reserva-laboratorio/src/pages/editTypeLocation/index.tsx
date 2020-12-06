import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import { baseUrl } from '../../config/url.json'
function EditTypeLocation() {
  const sessionToken = localStorage.getItem("sessionToken") || '';
  const expires_at = localStorage.getItem("expires_at") || '';
  const History = useHistory()
  const { addToast } = useToasts()
  const user = localStorage.getItem("userId") || '';
  const { id }: any = useParams();
  const [description, descriptionState] = useState("");

  async function handleWithPageLoad() {
    const data = {
      url: `${baseUrl}/location/type/${id}`,
      options: {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionToken,
          userId: user,
        },
      },
    }
    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            const { description } = data[0]
            descriptionState(description)
          })
        } else {
          response.json().then(data => {
            const { error } = data
            addToast(error, { appearance: 'error', autoDismiss: true })
          })
        }
      })
  }
  async function handleWithSubmit() {
    const data = {
      url: `${baseUrl}/location/type/${id}`,
      options: {
        method: "put",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
          authorization: sessionToken,
          userId: user,
        },
      },
    }
    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            const { message } = data
            addToast(message, {
              appearance: 'success',
              autoDismiss: true
            })
            History.go(-1)
          })
        } else {
          response.json().then(data => {
            const { error } = data
            addToast(error, { appearance: 'error', autoDismiss: true })
          })
        }
      })
  }

  function handleWithBackButton() {
    History.go(-1)
  }

  useEffect(() => {
    handleWithPageLoad()
  }, ['loading'])

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="editTypeLocation" />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Editar Tipo de Espaço</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => descriptionState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button
                className="btn btn-success"
                onClick={handleWithSubmit}
              >Salvar</button>
              <button
                className="btn btn-danger"
                onClick={handleWithBackButton}
              >Voltar</button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default EditTypeLocation;
