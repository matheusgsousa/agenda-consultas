import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react'
import firebase from '../database/firebase'
import { BsCheckLg} from 'react-icons/bs';
import './AddForms.css'

const AddForm = () =>{
  const [nomePaciente, setNomePaciente] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [loader, setLoader] = useState(false);
  const mystyle = {
    marginBottom: "10px",
    borderRadius: "2px",
    border: "1px shadow #000",
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    firebase.db.collection("agendamento")
      .add({
        nomePaciente: nomePaciente,
        data: data,
        horario: horario,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setNomePaciente("");
    setData("");
    setHorario("");
  };
  return(
    <Form onSubmit={handleSubmit}>
    <Form.Group>
    
        <Form.Control
          
            type="text"
            placeholder="Nome"
            name="name"
            value={nomePaciente}
            onChange={(e) => setNomePaciente(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="date"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="number"
            placeholder="Horário"
            name="horario"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Button type="submit" variant="success" block style={{ background: loader ? "#ccc" : "#0d6efd"}}>
        <BsCheckLg/>
    </Button>
</Form>
  )
}
export default AddForm;