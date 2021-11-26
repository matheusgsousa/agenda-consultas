import React, { useState, useEffect } from 'react'
import AddForm from '../components/AddForm';
import firebase from '../database/firebase'
import { Modal, Button } from 'react-bootstrap';
import './Style.css';
import { BsPencilFill} from 'react-icons/bs';
import { BsTrashFill} from 'react-icons/bs';
import { FaBookMedical} from 'react-icons/fa';


// import moment from 'moment'

export default function Agendamentos() {
    const [state, setState] = useState([])
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const mystyle = {
        marginRight: "5px",
        textAlign:"center"
      };
    
    
 




    useEffect(() => {
        firebase.db.collection('agendamento').onSnapshot((querySnapshot) => {
            const firebase = []
            querySnapshot.docs.forEach((doc) => {
                
                const { nomePaciente, data, horario } = doc.data()
                firebase.push({ id: doc.id, nomePaciente, data, horario })
            })
            setState(firebase)
        })
    }, [])
    
    
   

    return (
        <>
        

    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>Agendamento <b>Pacientes</b></h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} variant="outline-primary" data-toggle="modal"><FaBookMedical style={mystyle}/><span>Agendar</span></Button>					
            </div>
        </div>
    </div>
            
            <table  class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome Paciente</th>
                        <th scope="col">Data</th>
                        <th scope="col">Horário</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td className="mai">{item.nomePaciente}</td>
                            <td>{item.data} </td>
                            <td> {item.horario} </td>
                            <td> <Button><BsPencilFill /></Button> </td>
                            
                            <td> <Button variant="danger"><BsTrashFill/></Button> </td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>

                    <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Agendamento
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm/>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="light" onClick={handleClose}>
                            Fechar
                        </Button>
                </Modal.Footer>
            </Modal>
           

        </>
    )
}