import * as yup from "yup";

const formLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Deve ser um e-mail válido")
    .required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

const formRegisterSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .email("Deve ser um e-mail válido")
    .required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  phone: yup.number().required("Telefone obrigatório"),
});

export { formLoginSchema, formRegisterSchema };
