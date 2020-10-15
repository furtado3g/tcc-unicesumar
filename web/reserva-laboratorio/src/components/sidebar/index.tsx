import React from 'react';
import { Link } from "react-router-dom";
import './styles.css'

import Logo from './img/logo.png'
import HomeIcon from './img/home.svg'
import DashboardIcon from './img/dashboard.svg'
import CalendarIcon from './img/calendar.svg'
import TextIcon from './img/text_snippet.svg'
import ArrowBackIcon from './img/arrow_back.svg'

function Menu (){
    function handlewithtoggle(){
        document.querySelector(".sidebar")?.classList.toggle('only-logo')
        document.querySelectorAll(".icon-text")?.forEach(element=>element.classList.toggle('hidden'))
    }

    function handleWithlogout(){
        localStorage.clear()
    }
    return (
        <>
            <div className="sidebar only-logo">
                <div className=" sidebar-logo" onClick={handlewithtoggle}>
                    <img src={Logo} alt="Logo"/>
                </div>
                <div className="sidebar-item">
                    <Link to="/home">
                        <img src={HomeIcon} alt="Icon for home"/>
                        <h4 className="icon-text hidden">Início</h4>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link  to="/admin">
                        <img src={DashboardIcon} alt="Icon for admin"/>
                        <h4 className="icon-text hidden">Administrador</h4>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link  to="/reserves">
                        <img src={CalendarIcon} alt="Icon for admin"/>
                        <h4 className="icon-text hidden">Reservas</h4>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link  to="/history">
                        <img src={TextIcon} alt="Icon for admin"/>
                        <h4 className="icon-text hidden">Histórico</h4>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link  to="/changePassword">
                        <i className="fas fa-fingerprint"></i>
                        <h4 className="icon-text hidden">Segurança</h4>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link  to="/" onClick={handleWithlogout}>
                        <img src={ArrowBackIcon} alt="Icon for admin"/>
                        <h4 className="icon-text hidden">Sair</h4>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Menu