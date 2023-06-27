import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { BiSend, BiArrowBack } from "react-icons/bi";
import styles from "../../styles/index.module.css";
import axios from "axios";
import atestadoValidator from "@/validators/atestadoValidator";

const form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  function salvar(dados) {
    console.log(dados);
    axios.post("/api/atestados", dados);
    push("/atestados");
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
        <Pagina titulo="Cadastro de Atestado">
          <Form>
            <Form.Group className="mb-3 text-white" controlId="nome">
              <Form.Label>
                <strong>Funcionário:</strong>
                <strong>(Selecione)</strong>
              </Form.Label>
              <Form.Select
                isInvalid={errors.nome}
                size="lg"
                {...register("nome", atestadoValidator.nome)}
              >
                {funcionarios.map((item) => (
                  <option>{item.nome}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="atestado">
              <Form.Label>
                <strong>Atestado:</strong>
                <strong>(Selecione)</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.atestado}
                as="select"
                {...register("atestado", atestadoValidator.atestado)}
              >
                <option value="Médico">Médico</option>
                <option value="Comparecimento">Comparecimento</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="data">
              <Form.Label>
                <strong>Data:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.data}
                type="date"
                placeholder="Selecione a data do atestado..."
                {...register("data", atestadoValidator.data)}
              />
              {errors.data && (
                <small className="error-message bg-danger text-white">
                  {errors.data.message}
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
                href="/atestados"
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
