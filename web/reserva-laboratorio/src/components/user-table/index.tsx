import React , {memo} from 'react'
import { Table } from 'semantic-ui-react'
function UserTable(props: any){
    const tableData = props.data
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Usuario</Table.HeaderCell>
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
                                    <Table.Cell>
                                        <button className="btn ">
                                            <i className="fas fa-user-edit"></i>
                                            Editar
                                        </button>
                                        <button className="btn ">
                                            <i className="fas fa-user-minus"></i>
                                            Excluir
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )

                        })
                    }
                    return (
                        <Table.Row>
                            <Table.Cell>Nenhum usuário encontrado</Table.Cell>
                        </Table.Row>
                    )
                })()}
            </Table.Body>
            {props.children}
        </Table>
    )
}

export default memo(UserTable)