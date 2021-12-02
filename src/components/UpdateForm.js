import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react'
import firebase from '../database/firebase'
import { BsCheckLg} from 'react-icons/bs';
import './AddForms.css'

const UpdateForm = () =>{
  const [updateAgenda, setupdateAgenda] = useState('')
  const mystyle = {
    marginBottom: "10px",
    borderRadius: "2px",
    border: "1px shadow #000",
  };
  
 
  const onUpdate= (id) =>{
    firebase.db.collection('agendamento').doc(id).set({nomePaciente:updateAgenda, data:updateAgenda, horario:updateAgenda})
  }

  

  return(
    <Form >
    <Form.Group>
    
        <Form.Control
          
            type="text"
            placeholder="Nome"
            name="name"
            value={nomePaciente}
            onChange={e=>setupdateAgenda(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="date"
            name="data"
            value={data}
            onChange={e=>setupdateAgenda(e.target.value)}
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
            onChange={e=>setupdateAgenda(e.target.value)}
            required
            style={mystyle}
        />
    </Form.Group>
    <Button onClick={()=>onUpdate(item.id)} variant="success" type="submit" block style={{ background: loader ? "#ccc" : "#0d6efd"}}>
        <BsCheckLg/>
    </Button>
    
</Form>

  )
  
}
export default UpdateForm;