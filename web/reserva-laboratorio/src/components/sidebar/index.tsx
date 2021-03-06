import React, { useState, memo } from 'react';
import { Link } from "react-router-dom";
import './styles.css'

import Logo from './img/logo.png'
import HomeIcon from './img/home.svg'
import DashboardIcon from './img/dashboard.svg'
import CalendarIcon from './img/calendar.svg'
import TextIcon from './img/text_snippet.svg'
import { useHistory } from 'react-router-dom'
import { baseUrl } from '../../config/url.json'
function Menu() {

    const [toggle, toggleState] = useState(false)
    const History = useHistory()
    const [user_type, user_typeState] = useState(0)
    const token: any = localStorage.getItem("sessionToken")
    const user: any = localStorage.getItem("userId")
    async function getUserType() {
        const data = {
            url: `${baseUrl}/user/` + user,
            options: {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                    userId: user
                }
            }
        }
        await fetch(data.url, data.options)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                const { user_type } = result
                console.log(user_type)
                user_typeState(user_type)
            })
    }

    function handlewithtoggle() {
        if (toggle) {
            toggleState(false)
        } else {
            toggleState(true)
        }
        document.querySelector(".sidebar")?.classList.toggle('only-logo')
        document.querySelectorAll(".icon-text")?.forEach(element => element.classList.toggle('hidden'))
    }

    function handleWithlogout() {
        localStorage.clear()
    }

    function handleWithRedirect(link: string) {
        toggleState(true)
        History.push(link)
    }

    function isAdmin(userType: any) {
        if (userType == 1) {
            return (
                <div className="sidebar-item">
                    <a onClick={() => { handleWithRedirect("/admin") }}>
                        <img src={DashboardIcon} alt="Icon for admin" />
                        <h4 className="icon-text hidden">Administrador</h4>
                    </a>
                </div>
            )
        }
    }

    React.useEffect(() => {
        getUserType()
    }, ['loading'])

    return (
        <>
            <div
                className="sidebar only-logo"
                onMouseEnter={() => { if (!toggle) return handlewithtoggle() }}
                onMouseLeave={() => { if (toggle) return handlewithtoggle() }}
            >
                <div className=" sidebar-logo" onClick={handlewithtoggle}>
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="sidebar-item">
                    <a onClick={() => { handleWithRedirect('/home') }} >
                        <img src={HomeIcon} alt="Icon for home" />
                        <h4 className="icon-text hidden">Início</h4>
                    </a>
                </div>
                {
                    //VERIFICA SE O USUARIO É ADMINSTRADOR OU NÃO
                    //SE FOR O MESMO EXIBE O PAINEL DE ADMIN
                    isAdmin(user_type)
                }
                <div className="sidebar-item">
                    <a onClick={() => { handleWithRedirect("/reserves") }}>
                        <img src={CalendarIcon} alt="Icon for admin" />
                        <h4 className="icon-text hidden">Reservas</h4>
                    </a>
                </div>
                <div className="sidebar-item">
                    <a onClick={() => { handleWithRedirect("/reports") }}>
                        <img src={TextIcon} alt="Icon for admin" />
                        <h4 className="icon-text hidden">Relatórios</h4>
                    </a>
                </div>
                <div className="sidebar-item">
                    <a onClick={() => { handleWithRedirect("/changePassword") }}>
                        <i className="fas fa-fingerprint"></i>
                        <h4 className="icon-text hidden">Segurança</h4>
                    </a>
                </div>
                <div className="sidebar-item">
                    <Link to="/" onClick={handleWithlogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <h4 className="icon-text hidden">Sair</h4>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default memo(Menu)