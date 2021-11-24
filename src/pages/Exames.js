import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import firebase from '../database/firebase'
import AddExame from '../components/AddExame';
import { BsPencilFill} from 'react-icons/bs';
import { BsTrashFill} from 'react-icons/bs';
import { FaNotesMedical} from 'react-icons/fa';

export default function Exames() {
    const [state, setState] = useState([])
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        firebase.db.collection('exame').onSnapshot((querySnapshot) => {
            const firebase = []
            querySnapshot.docs.forEach((doc) => {
                console.log(doc.data())
                const { nomePaciente, observacao, descricao } = doc.data()
                firebase.push({ id: doc.id, nomePaciente, observacao, descricao })
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
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><FaNotesMedical/><span>Adicionar Exame</span></Button>					
            </div>
        </div>
    </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome Paciente</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Observação</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.nomePaciente}</td>
                            <td>{item.descricao}</td>
                            <td>{item.observacao}</td>
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
                    <AddExame/>
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