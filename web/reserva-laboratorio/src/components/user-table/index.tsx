import React , {memo} from 'react'
import { Table ,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import './styles.css'
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
                                    <Table.Cell textAlign='center'>
                                        <Link to={`/users/${data.id}`}>
                                            <Button color='grey'>
                                                <i className="fas fa-user-edit"></i>
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button color='black'>
                                            <i className="fas fa-user-minus"></i>
                                            Excluir
                                        </Button>
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