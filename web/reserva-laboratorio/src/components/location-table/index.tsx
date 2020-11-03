import React, { memo } from "react";
import { Table } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import {useToasts} from 'react-toast-notifications'

function LocationTable(props: any) {
  const History = useHistory();
  const {addToast} = useToasts()
  const {data} = props
  
  async function handleWithDelete(locationId: string){
    const data = {
      url : `http://localhost:3333/location/${locationId}`,
      options : {
        method: "delete",
        headers: {
          authorization : localStorage.getItem("sessionToken") || '',
          userId: localStorage.getItem("userId") || '',
        }
      }
    }

    await fetch(data.url, data.options)
    .then(response =>{
      if (response.status == 200) {
        response.json().then(data => {
          console.log(data)
          const { message, error } = data
          if (error) {
            addToast(error, {
              appearance: "error",
              autoDismiss: true
            })
          } else if (message) {
            addToast(message, {
              appearance: "success",
              autoDismiss: true
            })
            History.go(0)
          }
        })
      } else {
        response.json().then(data => {
          const { message, error } = data
          if (error) {
            addToast(error, {
              appearance: "error",
              autoDismiss: true
            })
          } else if (message) {
            addToast(message, {
              appearance: "warning",
              autoDismiss: true
            })
          }
        })
      }
    })

  }

  function handleWithDetail(locationId: string) {
    History.push(`/location/${locationId}`);
  }

  return (
    <>
      <Table celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Capacidade</Table.HeaderCell>            
            <Table.HeaderCell>Opções</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(() => {
            console.log(data)
            if (!data) {
              return (
                <Table.Row>
                  <Table.Cell colSpan="4">Nenhum Local Cadastrado</Table.Cell>
                </Table.Row>
              );

            } else {
              return data.map((item: any) => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.comments}</Table.Cell>
                    <Table.Cell>{item.type}</Table.Cell>
                    <Table.Cell textAlign="right">{item.capacity}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <button
                        className="btn btn-light"
                        onClick={(e) => {
                          handleWithDetail(item.id);
                        }}
                      >
                        <i className="far fa-edit"></i>
                        Editar
                      </button>
                      <button 
                        className="btn btn-light"
                        onClick={e=>{handleWithDelete(item.id)}}
                      >
                        <i className="far fa-trash-alt"></i>
                        Excluir
                      </button>
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          })()}
        </Table.Body>
        {props.children}
      </Table>
    </>
  )
}

export default memo(LocationTable);
