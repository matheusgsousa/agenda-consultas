import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import firebase from '../database/firebase'
import AddExame from '../components/AddExame';
import { BsPencilFill} from 'react-icons/bs';
import { BsTrashFill} from 'react-icons/bs';
import { FaNotesMedical} from 'react-icons/fa';
import './Style.css';

export default function Exames() {
    const [state, setState] = useState([])
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const mystyle = {
        marginRight: "5px",
        textAlign:"center"
      };

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
                <h2>Adicionar <b>Exames</b></h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} variant="outline-primary" data-toggle="modal"><FaNotesMedical style={mystyle}/><span>Adicionar Exame</span></Button>					
            </div>
        </div>
    </div>
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome Paciente</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Observação</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td className="mai">{item.nomePaciente}</td>
                            <td className="mai">{item.descricao}</td>
                            <td className="mai">{item.observacao}</td>
                            <td> <Button onClick={handleShow}><BsPencilFill /></Button> </td>
                            <td> <Button  variant="danger"><BsTrashFill/></Button> </td>
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
                        <Button variant="light" onClick={handleClose}>
                            Fechar
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}