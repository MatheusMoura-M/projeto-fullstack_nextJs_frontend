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
  phone: yup.string().required("Telefone obrigatório"),
});

const formRegisterContactSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .email("Deve ser um e-mail válido")
    .required("E-mail obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
});

const formUpdateContactSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email("Deve ser um e-mail válido").notRequired(),
  phone: yup.string().notRequired(),
});

export {
  formLoginSchema,
  formRegisterSchema,
  formRegisterContactSchema,
  formUpdateContactSchema,
};
