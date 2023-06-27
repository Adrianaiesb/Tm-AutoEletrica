import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { BiSend, BiArrowBack } from "react-icons/bi";
import styles from "../../styles/index.module.css";
import axios from "axios";
import decimoterceiroValidator from "@/validators/decimoterceiroValidator";

const form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  function salvar(dados) {
    console.log(dados);
    axios.post("/api/decimoterceiro", dados);
    push("/decimoterceiro");
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
        <Pagina titulo="Cadastro de 13°">
          <Form>
            <Form.Group className="mb-3 text-white" controlId="nome">
              <Form.Label>
                <strong>Funcionário:</strong>
                <strong>(Selecione)</strong>
              </Form.Label>
              <Form.Select
                isInvalid={errors.nome}
                size="lg"
                {...register("nome", decimoterceiroValidator.nome)}
              >
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

            <Form.Group className="mb-3 text-white" controlId="dataentrada">
              <Form.Label>
                <strong>Data de entrada:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.dataentrada}
                type="date"
                placeholder="Selecione a data de entrada do funcionário..."
                {...register("dataentrada", decimoterceiroValidator.dataentrada)}
              />
              {errors.dataentrada && (
                <small className="error-message bg-danger text-white">
                  {errors.dataentrada.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="datacomulta">
              <Form.Label>
                <strong>Data da comulta:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.datacomulta}
                type="date"
                placeholder="Selecione a data da comulta..."
                {...register("datacomulta", decimoterceiroValidator.datacomulta)}
              />
              {errors.datacomulta && (
                <small className="error-message bg-danger text-white">
                  {errors.datacomulta.message}
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
                href="/decimoterceiro"
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
