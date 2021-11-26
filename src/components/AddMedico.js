import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react'
import firebase from '../database/firebase'
import { BsCheckLg} from 'react-icons/bs';
import './AddForms.css'


const AddMedico = () =>{
  const [nomeMedico, setNomeMedico] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [crm, setCrm] = useState('')
  const [loader, setLoader] = useState(false);
  const mystyle = {
    marginBottom: "10px",
    borderRadius: "2px",
    border: "1px shadow #000",
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    firebase.db.collection("medico")
      .add({
        nomeMedico: nomeMedico,
        email: email,
        telefone: telefone,
        crm: crm,
      })
      .then(() => {
        setLoader(false);
        alert("Concluído");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setNomeMedico("");
    setEmail("");
    setCrm("");
    setTelefone("");
  };
  return(
    <Form onSubmit={handleSubmit}>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Nome"
            name="name"
            value={nomeMedico}
            onChange={(e) => setNomeMedico(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="email"
            placeholder="E-Mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="number"
            placeholder="Telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="number"
            placeholder="CRM"
            name="crm"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Button variant="success" type="submit" block style={{ background: loader ? "#ccc" : "#0d6efd"}}>
        <BsCheckLg/>
    </Button>
</Form>
  )
}
export default AddMedico;