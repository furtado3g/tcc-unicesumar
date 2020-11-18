import React, { memo } from 'react'
import { Table, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { baseUrl } from '../../config/url.json'
import { useToasts } from 'react-toast-notifications'

function UserLocationTable(props: any) {

    const tableData = props
    const { userId } = props
    const History = useHistory();
    const { addToast } = useToasts()
    function handleWithEdit(userLocationId: string) {
        History.push(`${baseUrl}/user/${userId}/location/${userLocationId}`)
    }

    async function handleWithDelete(userLocationId: String) {
        const data = {
            url: `${baseUrl}/location/user/${userLocationId}`,
            options: {
                method: "delete",
                headers: {
                    authorization: localStorage.getItem("sessionToken") || '',
                    userid: localStorage.getItem("userId") || ''
                }
            }
        }
        await fetch(data.url, data.options)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        const { message } = data
                        addToast(message, { appearance: "success", autoDismiss: true })
                        History.go(0)
                    })
                } else {
                    response.json().then(data => {
                        const { error, message } = data
                        if (error) {
                            addToast(error, { appearance: "error", autoDismiss: true })
                        } else {
                            addToast(message, { appearance: "warning", autoDismiss: true })
                        }
                    })
                }
            })
    }

    return (
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Locais</Table.HeaderCell>
                        <Table.HeaderCell>Opções</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(() => {
                        if (tableData.tableData[0]) {
                            return tableData.tableData.map((data: any) => {
                                return (
                                    <Table.Row key={data.id}>
                                        <Table.Cell>{data.comments}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button
                                                color="black"
                                                onClick={() => {
                                                    handleWithDelete(data.id);
                                                }}
                                            >
                                                <i className="fas fa-user-times margin icon"></i>
                                                Excluir
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
        </>
    )
}

export default memo(UserLocationTable)