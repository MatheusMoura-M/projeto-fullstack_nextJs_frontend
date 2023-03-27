import api from "@/services/api";
import {
  iClientLogin,
  iClientRegister,
  iContactRegister,
  iContactResponse,
  iParams,
  iProviderProps,
} from "@/types";
import {
  Box,
  Button,
  Link,
  ListItem,
  MenuItem,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import nookies from "nookies";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";

interface iAuthProviderData {
  onLogin: (clientData: iClientLogin) => void;
  onRegister: (clientData: iClientRegister) => void;
  onRegisterContact: (contactData: iContactRegister) => void;
  onUpdateContact: (contactData: iContactRegister) => void;
  onGetAllContacts: (param: string) => void;
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
  client: iContactResponse[] | undefined;
  setClient: Dispatch<SetStateAction<iContactResponse[] | undefined>>;
  allContacts: iContactResponse[] | undefined;
  setAllContacts: Dispatch<SetStateAction<iContactResponse[] | undefined>>;
  isContainsClient: boolean;
  setIsContainsClient: Dispatch<SetStateAction<boolean>>;
  isContainsContacts: boolean;
  setIsContainsContacts: Dispatch<SetStateAction<boolean>>;
  showModalUpdateContact: boolean;
  setShowModalUpdateContact: Dispatch<SetStateAction<boolean>>;
  NavLink: ({ children }: iProviderProps) => JSX.Element;
  MenuHamburguer: ({ children }: iProviderProps) => JSX.Element;
  ContactItem: ({ id, name, email, phone }: iContactRegister) => JSX.Element;
  ClientItem: ({ id, name, email, phone }: iContactRegister) => JSX.Element;
}

const AuthContext = createContext<iAuthProviderData>({} as iAuthProviderData);

export const AuthProvider = ({ children }: iProviderProps) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPhone, setInputPhone] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [client, setClient] = useState<iContactResponse[]>();
  const [allContacts, setAllContacts] = useState<
    iContactResponse[] | undefined
  >();
  const [isContainsClient, setIsContainsClient] = useState(false);
  const [isContainsContacts, setIsContainsContacts] = useState(false);
  const [getId, setGetId] = useState<iParams>();
  const [showModalUpdateContact, setShowModalUpdateContact] =
    useState<boolean>(false);

  const instantiateToken = () => {
    const cookies = nookies.get();
    api.defaults.headers.Authorization = `Bearer ${cookies["kenzie.token"]}`;
  };

  const toast = useToast();
  const router = useRouter();

  const logout = (param: string) => {
    if (param === "CloseModal") {
      setIsContainsClient(!isContainsClient);
    }
    destroyCookie(null, "kenzie.token");
    router.push("/");
  };

  const onLogin = (clientData: iClientLogin) => {
    api
      .post("/login", clientData)
      .then((response) => {
        setCookie(null, "kenzie.token", response.data.token, {
          maxAge: 60 * 360,
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
              Erro ao logar, verifique suas credenciais
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

  const onGetClient = (param: string) => {
    instantiateToken();

    const token = nookies.get()["kenzie.token"];
    const decoded: any = jwt_decode(token);

    api
      .get(`/client/${decoded.sub}`)
      .then(({ data }) => {
        setClient([data]);
        {
          param === "Client" && setIsContainsClient(!isContainsClient);
        }
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

  const onGetAllContacts = (param: string) => {
    instantiateToken();
    api
      .get("client/contacts")
      .then(({ data }) => {
        setAllContacts(data);
        {
          param === "Contatos" && setIsContainsContacts(!isContainsContacts);
        }
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

  const onUpdateContact = (contactData: iContactRegister) => {
    instantiateToken();
    const { id, param } = getId!;

    api
      .patch(
        `/${param === "Contact" ? "contacts" : "client"}/${id}`,
        contactData
      )
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
              {param === "Contact"
                ? "Contato atualizado com sucesso !"
                : "Cliente atualizado com sucesso !"}
            </Box>
          ),
        });
        {
          param === "Contact" ? onGetAllContacts("") : onGetClient("");
        }
        setShowModalUpdateContact(false);
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

  const onDeleteContact = (data: iParams) => {
    instantiateToken();
    const { id, param } = data;

    api
      .delete(`${param === "Delete Contact" ? "contacts" : "client"}/${id}`)
      .then((res) => {
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
              {param === "Delete Contact"
                ? "Contato deletado com sucesso !"
                : "Cliente deletado com sucesso !"}
            </Box>
          ),
        });
        {
          param === "Delete Contact"
            ? onGetAllContacts("")
            : logout("CloseModal");
        }
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

  const getFunction = (data: iParams) => {
    setGetId(data);
    if (data.param === "Delete Contact" || data.param === "Delete Client") {
      onDeleteContact(data);
    } else {
      setShowModalUpdateContact(true);
    }
  };

  const NavLink = ({ children }: iProviderProps) => (
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
      onClick={
        children === "Contatos" ? () => onGetAllContacts("Contatos") : undefined
      }
    >
      {children}
    </Link>
  );

  const ContactItem = ({ id, name, email, phone }: iContactRegister) => (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
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
      <VStack alignItems={"unset"}>
        <ListItem>
          <strong>Nome:</strong> {name}
        </ListItem>
        <ListItem>
          <strong>Email:</strong> {email}
        </ListItem>
        <ListItem>
          <strong>Telefone:</strong> {phone}
        </ListItem>
      </VStack>
      <VStack justifyContent={"space-around"}>
        <Button
          variant={"close"}
          onClick={() => getFunction({ id: id, param: "Delete Contact" })}
          minW={8}
          maxH={27}
        >
          <DeleteIcon fontSize={15} />
        </Button>
        <Button
          variant={"close"}
          onClick={() => getFunction({ id: id, param: "Contact" })}
          minW={8}
          maxH={27}
        >
          <EditIcon fontSize={15} />
        </Button>
      </VStack>
    </Box>
  );

  const ClientItem = ({ id, name, email, phone }: iContactRegister) => (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
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
      <VStack alignItems={"unset"}>
        <Text>
          <strong>Nome:</strong> {name}
        </Text>
        <Text>
          <strong>Email:</strong> {email}
        </Text>
        <Text>
          <strong>Telefone:</strong> {phone}
        </Text>
      </VStack>
      <VStack justifyContent={"space-around"}>
        <Button
          variant={"close"}
          onClick={() => getFunction({ id: id, param: "Delete Client" })}
          minW={8}
          maxH={27}
        >
          <DeleteIcon fontSize={15} />
        </Button>
        <Button
          variant={"close"}
          onClick={() => getFunction({ id: id, param: "Client" })}
          minW={8}
          maxH={27}
        >
          <EditIcon fontSize={15} />
        </Button>
      </VStack>
    </Box>
  );

  const MenuHamburguer = ({ children }: iProviderProps) => (
    <MenuItem
      justifyContent={"center"}
      bg={"#6b1885"}
      color={"gray.200"}
      border={"1px solid"}
      borderColor={"#b02be5"}
      onClick={
        children === "Sair"
          ? () => logout("")
          : children === "Contatos"
          ? () => onGetAllContacts("Contatos")
          : () => onGetClient("Client")
      }
      _hover={{
        bg: "#b02be5",
        color: "gray.800",
        transition: "0.2s",
      }}
      transition="0.2s"
    >
      {children}
    </MenuItem>
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
        MenuHamburguer,
        onUpdateContact,
        showModalUpdateContact,
        setShowModalUpdateContact,
        client,
        setClient,
        isContainsClient,
        setIsContainsClient,
        ClientItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
