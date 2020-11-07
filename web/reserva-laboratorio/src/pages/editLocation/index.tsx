import React, {useState,useEffect} from "react";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import {useToasts} from 'react-toast-notifications'
import { useHistory,useParams } from 'react-router-dom'
import {baseUrl} from '../../config/url.json'

function EditLocation() {

  const [description, descriptionState] = useState("");
  const [locationTypes, locationTypesState] = useState([])
  const [type, typeState] = useState("");
  const [capacity, capacityState] = useState("");
  const History = useHistory()
  const { addToast } = useToasts()
  const params:any = useParams()

  async function getLocationTypeList() {
    const data = {
      url: `${baseUrl}/location/type`,
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

  async function handleWithSubmit() {
    const data = {
      url: `${baseUrl}/location/${params.id}`,
      options: {
        method: "put",
        body: JSON.stringify({
          tp_location: type,
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
            console.log(data)
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

  async function handleWithPageLoad(){
    const data = {
      url: `${baseUrl}/location/${params.id}`,
      options: {
        method : "get",
        headers: {
          authorization : localStorage.getItem("sessionToken") || '',
          userId : localStorage.getItem("userId") || '',
        }
      }
    }

    await fetch(data.url, data.options)
    .then(response =>{
      if(response.status == 200){
        response.json().then(data => {
          descriptionState(data[0].comments)
          typeState(data[0].type)
          capacityState(data[0].capacity)
        })
      }else{
        response.json().then(data => {
          const {error,message} = data
          if(message){
            addToast(message,{ appearance : "warning", autoDismiss: true})
          }else if(error){
            addToast(error,{ appearance : "error", autoDismiss: true})
          }
        })
      }
    })

  }

  useEffect(() => {
    getLocationTypeList()
    handleWithPageLoad()
  },['loading'])

  function handleWithBackButton(){
    History.go(-1)
  }

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="editLocation"/>
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Cadastrar Espaço</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="description">Descricao</label>
              <input 
                type="text" 
                className="form-control" 
                id="description"
                value={description} 
                onChange={(e) => descriptionState(e.target.value)}/>
            </div>
            <div className="col-6">
              <label htmlFor="capacity">Capacidade</label>
              <input 
                type="text" 
                className="form-control" 
                id="capacity"
                value={capacity}
                onChange={e=>capacityState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="userType">Tipo de Localização</label>
              <select 
                className="form-control"
                id="typeLocation"
                value={type}
                disabled
              >
                {locationTypes.map((item: any)=>{
                  return (
                    <option value={item.value} key={item.value}>{item.label}</option>
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

export default EditLocation;
