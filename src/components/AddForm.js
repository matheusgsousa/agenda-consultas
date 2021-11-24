import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react'
import firebase from '../database/firebase'
import { BsCheckLg} from 'react-icons/bs';

const AddForm = () =>{
  const [nomePaciente, setNomePaciente] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    firebase.db.collection("agendamento ")
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
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="date"
            placeholder="Data"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="number"
            placeholder="Horário"
            name="horario"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
        />
    </Form.Group>
    <Button variant="success" type="submit" block>
        <BsCheckLg/>
    </Button>
</Form>
  )
}
export default AddForm;