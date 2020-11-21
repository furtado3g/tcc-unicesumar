import React, { useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar/index";
import './styles.css'
import { baseUrl } from '../../config/url.json'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Button, Icon, Modal, Container, Header } from 'semantic-ui-react'
import History from "../history";

interface reserveInterface {
  id: string
  date: string
  time_start: string
  time_end: string
  class: string
  discipline: string
  comments: string
  location_id: string
  teacher_id: string
  location_name: string
  user_name: string
}

function Reservation() {

  const { addToast } = useToasts()
  const History = useHistory()
  const [event, eventState] = React.useState([])
  const [eventModal, eventModalState] = React.useState<reserveInterface>({
    id: 'number',
    date: 'string',
    time_start: 'string',
    time_end: 'string',
    class: 'string',
    discipline: 'string',
    comments: 'string',
    location_id: 'string',
    teacher_id: 'string',
    location_name: 'string',
    user_name: 'string'
  })

  async function handleWithPageLoad() {
    const data = {
      url: `${baseUrl}/reserve`,
      options: {
        method: "get",
        headers: {
          authorization: localStorage.getItem("sessionToken") || '',
          userid: localStorage.getItem("userId") || '',
        }
      }
    }
    await fetch(data.url, data.options)
      .then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            const events = data.map((item: any) => {
              return {
                title: item.class + ' - ' + item.discipline,
                date: moment(item.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                id: item.id
              }
            })
            console.log(events)
            eventState(events)
          })
        } else {
          response.json().then(data => {
            const { error, message } = data
            if (error && !message) {
              addToast(error, { appearance: 'error', autoDismiss: true })
            } else {
              addToast(message, { appearance: 'warning', autoDismiss: true })
            }
          })
        }
      })
  }

  async function handleWithDelete(id:string){
    const data = {
      url: `${baseUrl}/reserve/${id}`,
      options : {
        method : 'delete',
        headers: {
          authorization : localStorage.getItem("sessionToken") || '',
          userId: localStorage.getItem("userId") || '',
        }
      }
    }
    await fetch(data.url, data.options)
    .then(response=>{
      if(response.status == 200){
        response.json().then(data => {
          const { error, message } = data
          if (error && !message) {
            addToast(error, { appearance: 'error', autoDismiss: true })
          } else {
            addToast(message, { appearance: 'success', autoDismiss: true })
            History.go(0)
          }
        })
      }else{
        response.json().then(data => {
          const { error, message } = data
          if (error && !message) {
            addToast(error, { appearance: 'error', autoDismiss: true })
          } else {
            addToast(message, { appearance: 'warning', autoDismiss: true })
          }
        })
      }
    })
  }


  async function handleWithModalOpen(id: string) {
    const data = {
      url: `${baseUrl}/reserve/${id}`,
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
            eventModalState(data[0])
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

  function modalReducer(state: any, action: any) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size, id: action.id }
      default:
        throw new Error('Unsupported action...')
    }
  }

  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined,
    id: null
  })

  const { open, size, id } = state

  React.useEffect(() => {
    handleWithPageLoad()
  }, ['loading'])

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Reservas">
        <PanelSidebar>
          <PanelSidebarItem>
            <a onClick={() => { History.push('/reserves/add') }}>
              <i className="far fa-calendar-check"></i>
              Realizar Agendamento
            </a>
          </PanelSidebarItem>
        </PanelSidebar>
        <div className="row">
          <div className="col-12" id="calendar">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale="pt-Br"
              height="100%"
              events={event}
              eventClick={async e => {
                const { id }: any = JSON.parse(JSON.stringify(e.event))
                await handleWithModalOpen(id)
                  .then(e => { dispatch({ type: 'open', size: 'tiny', id: id }) })
                  .catch(e => { addToast('Ocorreu um erro ao tentar buscar dados do evento', { appearance: 'error', autoDismiss: true }) })
              }}
            />
          </div>
        </div>
      </Panel>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>{eventModal.class} - {eventModal.discipline}</Modal.Header>
        <Modal.Content>
          <Container text textAlign='justified'>
            <h5>
              Turma : <b>{eventModal.class}</b> <br />
              Disciplina : {eventModal.discipline} <br />
              Data : {moment(eventModal.date, 'YYYY-MM-DD').calendar()} <br />
              Inicio : {eventModal.time_start} <br />
              Termino : {eventModal.time_end} <br />
              Local : {eventModal.location_id} - {eventModal.location_name} <br />
              Colaborador : {eventModal.teacher_id} - {eventModal.user_name} <br />
            </h5>
            <h4>
              {eventModal.comments}
            </h4>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Sair
          </Button>
          <Button negative onClick={() => handleWithDelete(eventModal.id)}>
            Excluir
          </Button>
          <Button positive onClick={() => History.push(`/reserves/${eventModal.id}`)}>
            Editar Reserva
          </Button>
        </Modal.Actions>
      </Modal>
    </div>

  );
}
export default Reservation;
