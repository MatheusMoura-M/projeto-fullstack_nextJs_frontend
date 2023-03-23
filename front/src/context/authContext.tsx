import api from "@/services/api";
import { iClientLogin, iClientRegister, iProviderProps } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface iAuthProviderData {
  onLogin: (clientData: iClientLogin) => void;
  onRegister: (clientData: iClientRegister) => void;
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
}

const AuthContext = createContext<iAuthProviderData>({} as iAuthProviderData);

export const AuthProvider = ({ children }: iProviderProps) => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        console.log(err);
      });
  };
  return (
    <AuthContext.Provider
      value={{
        onLogin,
        onRegister,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
