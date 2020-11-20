import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/index'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Panel from '../../components/panel'

function Home() {
  const sessionToken = localStorage.getItem("sessionToken")
  const expires_at = localStorage.getItem("expires_at")
  const { addToast } = useToasts();
  const History = useHistory();
  useEffect(() => {
    if (sessionToken == null) {
      addToast("É necessário estar logado para obter acesso ao sistema", { appearance: 'warning', autoDismiss: true })
      History.push('/')
    }
    if (moment(expires_at) < moment()) {
      addToast("Sessão expirada", { appearance: 'warning', autoDismiss: true })
      History.push('/')
    }
  }, [])
  return (

    <div className="container-admin">
      <Sidebar />
      <div className="panel">
        
      </div>

    </div>
  )
}

export default Home