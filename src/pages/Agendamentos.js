import React, { useState, useEffect } from 'react'
import firebase from '../database/firebase'
import { Modal, Button } from 'react-bootstrap';
import AddForm from '../components/AddForm';
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
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><FaBookMedical/><span>Agendar</span></Button>					
            </div>
        </div>
    </div>
            
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome Paciente</th>
                        <th scope="col">Data</th>
                        <th scope="col">Horário</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td class="ok">{item.nomePaciente}</td>
                            <td>{item.data} </td>
                            <td> {item.horario} </td>
                            <td> <Button onClick={handleShow}><BsPencilFill /></Button> </td>
                            
                            <td> <Button><BsTrashFill/></Button> </td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>

                    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Agendamento
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm/>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                </Modal.Footer>
            </Modal>
            

        </>
    )
}