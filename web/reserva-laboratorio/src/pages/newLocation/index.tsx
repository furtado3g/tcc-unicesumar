import React, { useState, useEffect } from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

function NewLocation() {

  const [locationTypes, locationTypesState] = useState([])
  const [selectedType, selectedTypeState] = useState('')
  const [description, descriptionState] = useState('')
  const [capacity, capacityState] = useState('')
  const { addToast } = useToasts()
  const History = useHistory()

  async function getLocationTypeList() {
    const data = {
      url: "http://localhost:3333/location/type",
      options: {
        method: "get",
        headers: {
          authorization: localStorage.getItem("sessionToken") || '',
          userId: localStorage.getItem("userId") || '',
        }
      }
    }
    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            const nodeArray: any = []
            if (data[0]) {
              nodeArray.push({ value: "", label: "Selecione a categoria do local" })
              data.map((item: any) => {
                let node = { value: item.id, label: item.description }
                nodeArray.push(node)
              })
            } else {
              nodeArray.push({ value: "", label: "Por Favor Registre um tipo de local para prossegir" })
            }
            locationTypesState(nodeArray)
          })
        }
      })
  }

  function handleWithBackButton(){
    History.go(-1)
  }

  async function handleWithSubmit() {
    const data = {
      url: "http://localhost:3333/location",
      options: {
        method: "post",
        body: JSON.stringify({
          tp_location: selectedType,
          comments : description,
          capacity
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("sessionToken") || '',
          userId: localStorage.getItem("userId") || '',
        }
      }
    }

    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            const { message, error } = data
            if (error) {
              addToast(error, {
                appearance: "error",
                autoDismiss: true
              })
            } else if (message) {
              addToast(message, {
                appearance: "success",
                autoDismiss: true
              })
              History.push('/locations')
            }
          })
        } else {
          response.json().then(data => {
            const { message, error } = data
            if (error) {
              addToast(error, {
                appearance: "error",
                autoDismiss: true
              })
            } else if (message) {
              addToast(message, {
                appearance: "warning",
                autoDismiss: true
              })
            }
          })
        }
      })
      .catch(err => {
        addToast("Erro ao processar requisição, Tente novamente mais tarde, Caso o erro persista envie um email para furtado3g@gmail.com",{
            appearance: 'error',
            autoDismiss: true
          })
      })
  }

  useEffect(() => {
    getLocationTypeList()
  }, ['loading'])

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="newLocation" />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Cadastrar Espaço</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={e => { descriptionState(e.target.value) }}
              />
            </div>
            <div className="col-6">
              <label htmlFor="capacity">Capacidade</label>
              <input
                type="text"
                className="form-control"
                id="capacity"
                onChange={e => { capacityState(e.target.value) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="userType">Tipo de Localização</label>
              <select className="form-control" onChange={e => { selectedTypeState(e.target.value) }}>
                {locationTypes.map((item: any) => {
                  return (
                    <option value={item.value}>{item.label}</option>
                  )
                })}
              </select>
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

export default NewLocation;
