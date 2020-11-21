import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/index'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { baseUrl } from '../../config/url.json'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'
function Home() {
  const sessionToken = localStorage.getItem("sessionToken")
  const expires_at = localStorage.getItem("expires_at")
  const [event, eventState] = React.useState([])
  const { addToast } = useToasts();
  const History = useHistory();
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
                date: moment(item.date,'YYYY-MM-DD').format('YYYY-MM-DD'),
                id: item.id
              }
            })
            eventState(events)
            console.log(JSON.stringify(events))
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
  useEffect(() => {
    if (sessionToken == null) {
      addToast("É necessário estar logado para obter acesso ao sistema", { appearance: 'warning', autoDismiss: true })
      History.push('/')
    }
    if (moment(expires_at) < moment()) {
      addToast("Sessão expirada", { appearance: 'warning', autoDismiss: true })
      History.push('/')
    }
    handleWithPageLoad()
  }, ['loading'])
  return (

    <div className="container-admin">
      <Sidebar />
      <div className="panel" >
        <Container id="calendar-home">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="pt-Br"
            height="100%"
            weekends={false}
            events={event}

          />
        </Container>
      </div>

    </div>
  )
}

export default Home