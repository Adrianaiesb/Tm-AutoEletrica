import React, { useEffect, useState } from "react";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { BiSend, BiArrowBack } from "react-icons/bi";
import styles from "../../styles/index.module.css";
import axios from "axios";
import Notificacao from "@/components/Notificacao";

const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  function salvar(dados) {
    console.log(dados);
    axios.post("/api/solicitacoes", dados);
    setMostrarNotificacao(true);
  }

  const [funcionarios, setFuncionarios] = useState([]);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);

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
        <Pagina titulo="Cadastro de Solicitação">
          {mostrarNotificacao && ( 
            <Notificacao
              tipo="success"
              mensagem="Solicitação enviada com sucesso"
            />
          )}
          <Form>
            <Form.Group className="mb-3 text-white" controlId="nome">
              <Form.Label>
                <strong>Funcionário:</strong>
                <strong>(Selecione)</strong>
              </Form.Label>
              <Form.Select size="lg" {...register("nome")}>
                {funcionarios.map((item) => (
                  <option key={item.id}>{item.nome}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="assunto">
              <Form.Label>
                <strong>Assunto:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.assunto}
                type="text"
                placeholder="Digite o assunto da solicitação..."
                {...register("assunto")}
              />
              {errors.assunto && (
                <small className="error-message bg-danger text-white">
                  {errors.assunto.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="descricao">
              <Form.Label>
                <strong>Descrição:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.descricao}
                as="textarea"
                rows={3}
                placeholder="Digite a descrição da solicitação..."
                {...register("descricao")}
              />
              {errors.descricao && (
                <small className="error-message bg-danger text-white">
                  {errors.descricao.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="data">
              <Form.Label>
                <strong>Data:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.data}
                type="date"
                {...register("data")}
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
              <Button href="/" className="ms-2 btn btn-danger">
                <BiArrowBack className="me-2" /> Voltar
              </Button>
            </div>
          </Form>
        </Pagina>
      </div>
    </>
  );
};

export default FormPage;
