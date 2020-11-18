import React, { memo } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./styles.css";
import { baseUrl } from '../../config/url.json'

function UserTable(props: any) {
	const tableData = props.data;
	const token: any = localStorage.getItem("sessionToken");
	const user: any = localStorage.getItem("userId");
	const { addToast } = useToasts();
	const History = useHistory()

	async function handleWithDeleteUser(userId: number) {
		const data = {
			url: `${baseUrl}/user/` + userId,
			options: {
				method: "delete",
				body: JSON.stringify({
					action: "delete",
				}),
				headers: {
					"Content-Type": "application/json",
					authorization: token,
					userId: user,
				},
			},
		};
		await fetch(data.url, data.options)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				setTimeout(() => window.location.reload(), 3000);
				addToast(json.message, {
					appearance: "success",
					autoDismiss: true,
				});
			});
	}

	function handleWithRedirect(url: string) {
		History.push(url)
	}

	return (
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Usuário</Table.HeaderCell>
					<Table.HeaderCell>Opções</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{(() => {
					if (tableData[0]) {
						return tableData.map((data: any) => {
							return (
								<Table.Row key={data.id}>
									<Table.Cell>{data.name}</Table.Cell>
									<Table.Cell textAlign="center">
										<Button color="grey" onClick={() => { handleWithRedirect(`/users/${data.id}`) }}>											<i className="fas fa-user-edit margin-icon"></i>
											Editar
										</Button>
										<Button color="black" onClick={() => { handleWithDeleteUser(data.id); }}>
											<i className="fas fa-user-times margin icon"></i>
											Excluir
										</Button>
										<Button color="black" onClick={() => { handleWithRedirect(`/user/${data.id}/locations`)}}>
											<i className="fas fa-location-arrow margin icon"></i>
											Espaços
										</Button>
									</Table.Cell>
								</Table.Row>
							);
						});
					}
					return (
						<Table.Row>
							<Table.Cell>Nenhum usuário encontrado</Table.Cell>
						</Table.Row>
					);
				})()}
			</Table.Body>
			{props.children}
		</Table>
	);
}

export default memo(UserTable);
