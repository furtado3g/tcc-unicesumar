import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/index'
import moment from 'moment'
import toastr from 'toastr'
function Home(){
    const sessionToken = localStorage.getItem("sessionToken")
    const expires_at = localStorage.getItem("expires_at")
    useEffect(()=>{
        if (sessionToken == null) {
          toastr.options = {
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": 5000,
            "timeOut": 5000,
          }
          toastr.error("É necessario estar logado Para obter acesso ao Sistema")
          window.location.replace('/')
        }
        if (moment(expires_at) < moment()) {
          toastr.options = {
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "progressBar": false,
            "showDuration": 5000,
            "timeOut": 5000,
          }
          toastr.warning("Sua Sessão expirou")
          window.location.replace('/')
        }
      },[])
    return (
      <Sidebar />
    )
}

export default Home