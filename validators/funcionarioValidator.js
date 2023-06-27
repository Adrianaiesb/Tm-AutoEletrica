const funcionarioValidator = {
  nome: {
    required: "Nome é obrigatório!",
    minLength: {
      value: 3,
      message: "Pelo menos 3 caracteres!",
    },
    maxLength: {
      value: 150,
      message: "O máximo é 150 caracteres!",
    },
    pattern: {
      value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      message: "Apenas letras são permitidas!",
    },
  },
  cpf: {
    required: "Campo obrigatório!",
    maxLength: {
      value: 14,
      message: "O máximo é 14 caracteres!",
    },
    pattern: {
      value: /[0-9]+$/,
      message: "Apenas números são permitidos!",
    },
  },
  email: {
    required: "E-mail é obrigatório!",
    maxLength: {
      value: 100,
      message: "O máximo é 100 caracteres!",
    },
  },
  telefone: {
    required: "Telefone é obrigatório!",
    maxLength: {
      value: 16,
      message: "O máximo é 16 caracteres!",
    },
    pattern: {
      value: /[0-9]+$/,
      message: "Apenas números são permitidos!",
    },
  },
  cep: {
    required: "CEP é obrigatório!",
    maxLength: {
      value: 9,
      message: "O máximo é 9 caracteres!",
    },
    pattern: {
      value: /[0-9]+$/,
      message: "Apenas números são permitidos!",
    },
  },
};

export default funcionarioValidator;
