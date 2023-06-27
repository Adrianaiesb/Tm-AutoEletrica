import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const Notificacao = ({ tipo, mensagem }) => {
  return (
    <Alert variant={tipo} className="mt-3">
      {mensagem}
    </Alert>
  );
};

Notificacao.propTypes = {
  tipo: PropTypes.string.isRequired,
  mensagem: PropTypes.string.isRequired,
};


export default Notificacao;
