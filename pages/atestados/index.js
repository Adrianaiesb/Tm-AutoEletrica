import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { Button, Table } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/index.module.css"

const index = () => {
  const [atestados, setAtestados] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/atestados").then((resultado) => {
      setAtestados(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/atestados/" + id);
      getAll();
    }
  }

  return (
    <>
      <div className={styles.fundo}>
        <Pagina titulo="Atestados Cadastrados">
          <Link href="/atestados/form" className="btn btn-success">
            <AiFillPlusCircle /> Cadastrar Atestado
          </Link>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Funcionário</th>
                <th>Tipo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {atestados.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Button
                      className="btn btn-secondary me-2"
                      href={"/atestados/" + item.id}
                    >
                      <BiEditAlt title="Alterar" />
                    </Button>
                    <Button className="btn btn-danger">
                      <BiTrash title="Excluir" onClick={() => excluir(item.id)} />
                    </Button>
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.atestado}</td>
                  <td>{item.data}</td>
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
