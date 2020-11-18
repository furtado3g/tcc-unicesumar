import React, { useState, useEffect, memo } from "react";
import { useParams , useHistory} from "react-router-dom";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import { baseUrl } from '../../config/url.json'
import { useToasts } from 'react-toast-notifications'

function UserLocation() {

	const { addToast } = useToasts()
	const { id, idLocation }: any = useParams()
	const [locations, locationsState] = useState([])
	const [location, locationState] = useState('')
	const History = useHistory()
	
	async function handleWithPageLoad() {
		const data = {
			url: `${baseUrl}/locations`,
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
						locationsState(data.data)
					})
				} else {
					response.json().then(data => {
						const { error, message } = data
						if (error) {
							addToast(error, { appearance: "error", autoDismiss: true })
						}
					})
				}
			})
	}

	async function handleWithSubmit() {
		const data = {
			url: `${baseUrl}/location/user`,
			options: {
				method: "post",
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem("sessionToken") || '',
					userId: localStorage.getItem("userId") || '',
				},
				body: JSON.stringify({ locationId: location, userId: id })
			}
		}
		await fetch(data.url, data.options)
			.then(response => {
				response.json().then(data => {
					const { error, message } = data
					if(error && !message){
						addToast(error,{ appearance : 'error', autoDismiss: true})
					}else{
						if(message.includes('obrigatório')){
							addToast(message, { appearance :'warning', autoDismiss: true})
						}else{
							addToast(message, { appearance :'success', autoDismiss: true})
							History.go(-1)
						}
					}
				})
			})
	}

	useEffect(() => {
		handleWithPageLoad()
	}, ['loading'])

	return (
		<div className="container-admin">
			<Sidebar />
			<Panel title="Administrador">
				<AdminPanelSidebar className="userLocation" />
				<div className="panel-content">
					<div className="row">
						<h2 className="page-name">Usuário por Espaço</h2>
					</div>
					<div className="row">
						<div className="col-12">
							<label htmlFor="userType">Local</label>
							<select 
								className="form-control" 
								id="typeLocation"
								onChange={e=>{locationState(e.target.value)}}
							>
								<option value="">Selecione</option>
								{(() => {
									if (locations[0]) {
										return locations.map((location: any) => {
											return (
												<option value={location.id}>{location.comments}</option>
											)
										})
									}
								})()}
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-12 text-center">
							<button className="btn btn-success" onClick={handleWithSubmit}>Salvar</button>
							<button className="btn btn-danger" onClick={e=>{History.go(-1)}}>Voltar</button>
						</div>
					</div>
				</div>
			</Panel>
		</div>
	);
}
export default memo(UserLocation);
