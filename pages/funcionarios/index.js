import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { Button, Table } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/index.module.css"

const index = () => {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    getAll()
  }, []);

  function getAll(){
      axios.get('/api/funcionarios').then(resultado => {
        setFuncionarios(resultado.data);
    })
  }

  function excluir(id) {
      if(confirm('Deseja realmente excluir?')) {
        axios.delete('/api/funcionarios/' + id)
        getAll()
    }
  }

  return (
    <>
    <div className={styles.fundo}>
      <Pagina titulo="Funcionários">
        <br></br>
        <Link href="/funcionarios/form" className="btn btn-success">
          <AiFillPlusCircle /> Cadastrar Funcionário
        </Link>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Funcionário</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((item) => (
              <tr key={item.id}>
                <td>
                  <Button className='btn btn-secondary me-2' href={'/funcionarios/' + item.id}>
                    <BiEditAlt title="Alterar"/>
                    </Button> 
                  <Button className='btn btn-danger'>
                    <BiTrash onClick={() => excluir(item.id)}/>
                  </Button>
                </td>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.cep}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Pagina>
    </div>
    </>
  );
};

export default index