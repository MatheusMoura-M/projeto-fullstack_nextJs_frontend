import api from "@/services/api";
import {
  iClientLogin,
  iClientRegister,
  iContactRegister,
  iContactResponse,
  iProviderProps,
} from "@/types";
import { Box, Link, ListItem, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import nookies from "nookies";

interface iAuthProviderData {
  onLogin: (clientData: iClientLogin) => void;
  onRegister: (clientData: iClientRegister) => void;
  onRegisterContact: (contactData: iClientRegister) => void;
  inputName: string;
  setInputName: Dispatch<SetStateAction<string>>;
  inputEmail: string;
  setInputEmail: Dispatch<SetStateAction<string>>;
  inputPassword: string;
  setInputPassword: Dispatch<SetStateAction<string>>;
  inputPhone: string;
  setInputPhone: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  allContacts: iContactResponse[] | undefined;
  setAllContacts: Dispatch<SetStateAction<iContactResponse[] | undefined>>;
  isContainsContacts: boolean;
  setIsContainsContacts: Dispatch<SetStateAction<boolean>>;
  NavLink: ({ children }: iProviderProps) => JSX.Element;
  ContactItem: ({ name, email, phone }: iContactRegister) => JSX.Element;
  onGetAllContacts: () => void;
}

const instantiateToken = () => {
  const cookies = nookies.get();
  api.defaults.headers.Authorization = `Bearer ${cookies["kenzie.token"]}`;
};

const AuthContext = createContext<iAuthProviderData>({} as iAuthProviderData);

export const AuthProvider = ({ children }: iProviderProps) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPhone, setInputPhone] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [allContacts, setAllContacts] = useState<
    iContactResponse[] | undefined
  >();
  const [isContainsContacts, setIsContainsContacts] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const onLogin = (clientData: iClientLogin) => {
    api
      .post("/login", clientData)
      .then((response) => {
        setCookie(null, "kenzie.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Login realizado com sucesso !
            </Box>
          ),
        });
        router.push("/dashboard");
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao logar, verifique se o e-mail e senha estão corretos
            </Box>
          ),
        });
        console.log(err);
      });
  };

  const onRegister = (clientData: iClientRegister) => {
    api
      .post("/client", clientData)
      .then((resp) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Cadastro realizado com sucesso !
            </Box>
          ),
        });
        router.push("/dashboard");
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"red.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Ops, algo deu errado
            </Box>
          ),
        });
        console.log(err);
      });
  };

  const onRegisterContact = (contactData: iContactRegister) => {
    instantiateToken();
    api
      .post("/contacts", contactData)
      .then((resp) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Cadastro realizado com sucesso !
            </Box>
          ),
        });
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"red.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Ops, algo deu errado
            </Box>
          ),
        });
        console.log(err);
      });
  };

  const onGetAllContacts = () => {
    instantiateToken();
    api
      .get("/contacts")
      .then(({ data }) => {
        setAllContacts(data);
        setIsContainsContacts(!isContainsContacts);
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"red.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Ops, algo deu errado
            </Box>
          ),
        });
        console.log(err);
      });
  };

  const NavLink = ({ children }: iProviderProps) => (
    <>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        color={"black"}
        _hover={{
          textDecoration: "none",
          bg: "#b02be5",
          color: "gray.800",
          borderColor: "#6b1885",
          transition: "0.5s",
        }}
        transition={"0.5s"}
        href={"#"}
        onClick={children === "Contatos" ? onGetAllContacts : undefined}
      >
        {children}
      </Link>
    </>
  );

  const ContactItem = ({ name, email, phone }: iContactRegister) => (
    <Box
      bg={"#6b1885"}
      borderColor={"#b02be5"}
      border={"2px solid"}
      color={"gray.200"}
      p={3}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "#b02be5",
        borderColor: "#6b1885",
        color: "gray.800",
        transition: "0.5s",
      }}
      transition={"0.5s"}
    >
      <ListItem>Nome: {name}</ListItem>
      <ListItem>Email: {email}</ListItem>
      <ListItem>Telefone: {phone}</ListItem>
    </Box>
  );

  return (
    <AuthContext.Provider
      value={{
        onLogin,
        onRegister,
        onRegisterContact,
        inputName,
        inputEmail,
        inputPassword,
        inputPhone,
        showPassword,
        setInputName,
        setInputEmail,
        setInputPassword,
        setInputPhone,
        setShowPassword,
        allContacts,
        setAllContacts,
        isContainsContacts,
        setIsContainsContacts,
        NavLink,
        onGetAllContacts,
        ContactItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
