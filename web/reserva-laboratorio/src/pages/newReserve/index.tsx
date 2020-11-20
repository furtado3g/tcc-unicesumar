import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TimePicker, DatePicker } from 'antd';
import { Button } from 'semantic-ui-react'
import { baseUrl } from '../../config/url.json'
import { useToasts } from 'react-toast-notifications'
import locale from 'antd/es/date-picker/locale/pt_BR'
import moment from 'moment';
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import "./styles.css";
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css'
import 'moment/locale/pt-br';

function NewReserve() {

  const { addToast } = useToasts()
  const format = 'HH:mm';
  const dateFormat = 'DD/MM/YYYY';
  const History = useHistory()
  const [startDate, startDateState] = useState(moment())
  const [startTime, startTimeState] = useState('11:00')
  const [classes, classesState] = useState('')
  const [discipline, disciplineState] = useState('')
  const [location, locationState] = useState('')
  const [endTime, endTimeState] = useState('11:00')
  const [locations, locationsState] = useState([])
  const [comments, commentsState] = useState('')
  function handleWithReturn() {
    History.go(-1)
  }

  async function handleWithPageLoad() {
    const data = {
      url: `${baseUrl}/locations`,
      options: {
        method: "get",
        headers: {
          authorization: localStorage.getItem("sessionToken") || '',
          userid: localStorage.getItem("userid") || '',
        }
      }
    }
    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            locationsState(data.data)
          })
        } else {
          response.json().then(data => {
            const { error, message } = data
            if (error && !message) {
              addToast(error, { appearance: "error", autoDismiss: true })
            } else {
              addToast(message, { appearance: 'warning', autoDismiss: true })
            }
          })
        }
      })
  }

  async function handleWithSubmit() {
    const data = {
      url: `${baseUrl}/reserve`,
      options: {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem("sessionToken") || '',
          userid: localStorage.getItem("userId") || '',
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId") || '',
          locationId: location,
          date: startDate,
          time_start: startTime,
          time_end: endTime,
          classes: classes,
          discipline: discipline,
          comments: comments,
        })
      },
    }
    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            const { message, error } = data
            if (error && !message) {
              addToast(error, { appearance: "error", autoDismiss: true })
            } else {
              addToast(message, { appearance: 'success', autoDismiss: true })
              History.go(-1)
            }
          })
        } else {
          response.json().then(data => {
            const { message, error } = data
            if (error && !message) {
              addToast(error, { appearance: "error", autoDismiss: true })
            } else {
              addToast(message, { appearance: 'warning', autoDismiss: true })
            }
          })
        }
      })
  }

  React.useEffect(() => {
    handleWithPageLoad()
  }, ['loading'])

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Reservas">
        <PanelSidebar>
          <PanelSidebarItem >
            <a onClick={handleWithReturn}>
              <i className="fas fa-chevron-circle-left margin-icon"></i> Voltar
            </a>
          </PanelSidebarItem>
        </PanelSidebar>
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Nova Reserva</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="class">Turma</label>
              <input
                type="text"
                className="form-control"
                id="class"
                onChange={e => classesState(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="discipline">Disciplina</label>
              <input
                type="text"
                className="form-control"
                id="discipline"
                onChange={e => disciplineState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="locations">Local da Reserva</label>
              <select
                id="locations"
                className="form-control"
                onChange={e => locationState(e.target.value)}
                value={location}
              >
                <option value="">Selecione</option>
                {(() => {
                  if (locations[0]) {
                    return locations.map((location: any) => {
                      return (
                        <option value={location.id} key={location.id}>{location.comments}</option>
                      )
                    })
                  }
                })()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="data">Data da Reserva</label>
              <DatePicker
                className="form-control"
                locale={locale}
                format={dateFormat}
                onChange={(date: any) => { startDateState(date) }}
                value={startDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="data">Inicio</label>
              <TimePicker
                className="form-control"
                defaultValue={moment(startTime, format)}
                format={format}
                onChange={startTimeState}
              />
            </div>
            <div className="col-6">
              <label htmlFor="data">Termino</label>
              <TimePicker
                className="form-control"
                defaultValue={moment(endTime, format)}
                format={format}
                onChange={endTimeState}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="">Descrição</label>
              <textarea
                className="form-control"
                id="userName"
                onChange={e => commentsState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <Button color="black" onClick={handleWithSubmit}>
                <i className="fas fa-save margin-icon"></i>
                Salvar Reserva
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
export default NewReserve;
