import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { Button, Table } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/index.module.css"

const index = () => {
  const [decimoterceiro, setDecimoterceiro] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/decimoterceiro").then((resultado) => {
      setDecimoterceiro(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/decimoterceiro/" + id);
      getAll();
    }
  }

  return (
    <>
      <div className={styles.fundo}>
        <Pagina titulo="13° Cadastrados">
          <Link href="/decimoterceiro/form" className="btn btn-success">
            <AiFillPlusCircle /> Cadastrar 13°
          </Link>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Funcionário</th>
                <th>Data de entrada</th>
                <th>Data da consulta</th>
              </tr>
            </thead>
            <tbody>
              {decimoterceiro.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Button
                      className="btn btn-secondary me-2"
                      href={"/decimoterceiro/" + item.id}
                    >
                      <BiEditAlt title="Alterar" />
                    </Button>
                    <Button className="btn btn-danger">
                      <BiTrash title="Excluir" onClick={() => excluir(item.id)} />
                    </Button>
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.dataentrada}</td>
                  <td>{item.datacomulta}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Pagina>
      </div>
    </>
  );
};

export default index;
