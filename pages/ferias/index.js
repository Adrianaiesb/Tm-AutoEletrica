import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { Button, Table } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/index.module.css"

const index = () => {
  const [ferias, setFerias] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/ferias").then((resultado) => {
      setFerias(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/ferias/" + id);
      getAll();
    }
  }

  return (
    <>
      <div className={styles.fundo}>
        <Pagina titulo="Férias Cadastradas">
          <Link href="/ferias/form" className="btn btn-success">
            <AiFillPlusCircle /> Cadastrar Férias
          </Link>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Funcionário</th>
                <th>Data inicial</th>
                <th>Data final</th>
              </tr>
            </thead>
            <tbody>
              {ferias.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Button
                      className="btn btn-secondary me-2"
                      href={"/ferias/" + item.id}
                    >
                      <BiEditAlt title="Alterar" />
                    </Button>
                    <Button className="btn btn-danger">
                      <BiTrash title="Excluir" onClick={() => excluir(item.id)} />
                    </Button>
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.data}</td>
                  <td>{item.datafinal}</td>
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
