import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { BiSend, BiArrowBack } from "react-icons/bi";
import styles from "../../styles/index.module.css";
import axios from "axios";

const form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { push, query } = useRouter();

  useEffect(() => {
    if (query.id) {
      axios.get("/api/ferias/" + query.id).then((resultado) => {
        console.log(resultado.data);
        const ferias = resultado.data;
        for (let atributo in ferias) {
          setValue(atributo, ferias[atributo]);
        }
      });
    }
  }, [query.id]);

  function salvar(dados) {
    axios.put("/api/ferias/" + query.id, dados);
    push("/ferias");
  }

  const [funcionarios, setFuncionarios] = useState([]);

  function getAll() {
    axios.get("/api/funcionarios").then((resultado) => {
      setFuncionarios(resultado.data);
    });
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className={styles.fundo}>
        <Pagina titulo="Alteração de Férias">

          <Form>
            <Form.Group className="mb-3 text-white" controlId="nome">
              <Form.Label>
                <strong>Funcionário:</strong>
              </Form.Label>
              <Form.Select size="lg" {...register("nome")}>
                {funcionarios.map((item) => (
                  <option>{item.nome}</option>
                ))}
              </Form.Select>
              {errors.nome && (
                <small className="error-message bg-danger text-white">
                  {errors.nome.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="data">
              <Form.Label>
                <strong>Data Inicial:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.data}
                type="date"
                placeholder="Selecione a data de início das férias..."
                {...register("data")}
              />
              {errors.data && (
                <small className="error-message bg-danger text-white">
                  {errors.data.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="datafinal">
              <Form.Label>
                <strong>Data Final:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.datafinal}
                type="date"
                placeholder="Selecione a data final das férias..."
                {...register("datafinal")}
              />
              {errors.datafinal && (
                <small className="error-message bg-danger text-white">
                  {errors.datafinal.message}
                </small>
              )}
            </Form.Group>

            <div className="text-center">
              <Button
                className="ms-2 btn btn-success"
                type="submit"
                onClick={handleSubmit(salvar)}
              >
                <BiSend className="me-2" /> Salvar
              </Button>
              <Button
                href="/ferias"
                className="ms-2 btn btn-danger"
                type="submit"
              >
                <BiArrowBack className="me-2" /> Voltar
              </Button>
            </div>
          </Form>
        </Pagina>
      </div>
    </>
  );
};

export default form;
