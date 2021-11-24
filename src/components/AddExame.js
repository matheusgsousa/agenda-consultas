import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react'
import firebase from '../database/firebase'
import { BsCheckLg} from 'react-icons/bs';


const AddExame = () =>{
  const [nomePaciente, setNomePaciente] = useState('')
  const [descricao, setDescricao] = useState('')
  const [observacao, setObservacao] = useState('')
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    firebase.db.collection("exame")
      .add({
        nomePaciente: nomePaciente,
        descricao: descricao,
        observacao: observacao,
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
    setDescricao("");
    setObservacao("");
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
            type="text"
            placeholder="Descrição"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
        />
    </Form.Group>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Observação"
            rows={3}
            name="observacao"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
        />
    </Form.Group>
    <Button variant="success" type="submit" block>
        <BsCheckLg/>
    </Button>
</Form>
  )
}
export default AddExame;