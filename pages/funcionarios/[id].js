import React, { useEffect } from "react";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { BiSend, BiArrowBack } from "react-icons/bi";
import styles from "../../styles/index.module.css";
import axios from "axios";
import funcionarioValidator from "@/validators/funcionarioValidator";
import { mask } from "remask";

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
      axios.get("/api/funcionarios/" + query.id).then((resultado) => {
        console.log(resultado.data);

        const funcionario = resultado.data;

        for (let atributo in funcionario) {
          setValue(atributo, funcionario[atributo]);
        }
      });
    }
  }, [query.id]);

  function salvar(dados) {
    axios.put("/api/funcionarios/" + query.id, dados);
    push("/funcionarios");
  }

  function handleChange(event) {
    const name = event.target.name;
    const valor = event.target.value;
    const mascara = event.target.getAttribute("mask");
    setValue(name, mask(valor, mascara));
  }

  return (
    <>
      <div className={styles.fundo}>
        <Pagina titulo="Alteração de Funcionário">
          <Form>
            <Form.Group className="mb-3 text-white" controlId="nome">
              <Form.Label>
                <strong>Nome:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.nome}
                type="text"
                placeholder="Insira o nome completo do funcionário..."
                {...register("nome", funcionarioValidator.nome)}
              />
              {errors.nome && (
                <small className="error-message bg-danger text-white">
                  {errors.nome.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="cpf">
              <Form.Label>
                <strong>CPF:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.cpf}
                mask="999.999.999-99"
                maxLength={14}
                type="text"
                placeholder="Insira o CPF do funcionário..."
                {...register("cpf", funcionarioValidator.cpf)}
                onChange={handleChange}
              />
              {errors.cpf && (
                <small className="error-message bg-danger text-white">
                  {errors.cpf.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="telefone">
              <Form.Label>
                <strong>Telefone:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.telefone}
                mask="(99) 9 9999-9999"
                maxLength={16}
                type="text"
                placeholder="Insira o telefone do funcionário..."
                {...register("telefone", funcionarioValidator.telefone)}
                onChange={handleChange}
              />
              {errors.telefone && (
                <small className="error-message bg-danger text-white">
                  {errors.telefone.message}
                </small>
              )}
            </Form.Group>
            
            <Form.Group className="mb-3 text-white" controlId="email">
              <Form.Label>
                <strong>Email:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.email}
                type="text"
                placeholder="Insira o e-mail do funcionário..."
                {...register("email", funcionarioValidator.email)}
              />
              {errors.email && (
                <small className="error-message bg-danger text-white">
                  {errors.email.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-white" controlId="cep">
              <Form.Label>
                <strong>CEP:</strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.cep}
                mask="99999-999"
                maxLength={9}
                type="text"
                placeholder="Insira o CEP do funcionário..."
                {...register("cep", funcionarioValidator.cep)}
                onChange={handleChange}
              />
              {errors.cep && (
                <small className="error-message bg-danger text-white">
                  {errors.cep.message}
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
                href="/funcionarios"
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
