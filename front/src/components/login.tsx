import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { useAuth } from "@/context/authContext";
import { formLoginSchema } from "@/schemas";
import { iClientLogin } from "@/types";

import imgTelaBranca from "../../public/assets/img_white.jpg";
import imgMan from "../../public/assets/img_woman.png";
// import imgMan from "../../public/assets/img_man2.png.png";

const imgStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
};

const imgManStyle = {
  width: "70%",
  height: "70%",
  borderRadius: "1rem",
};

const Login = () => {
  const {
    inputEmail,
    inputPassword,
    showPassword,
    setInputEmail,
    setInputPassword,
    setShowPassword,
    onLogin,
  } = useAuth();

  const emailError = inputEmail === "";
  const passwordError = inputPassword === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iClientLogin>({
    resolver: yupResolver(formLoginSchema),
  });

  const onFormSubmit = (formData: iClientLogin) => {
    onLogin(formData);
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"90.2vh"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"90%"}
        width={"80%"}
        color={"gray.200"}
        bg={"gray.200"}
        rounded={"1rem"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"fixed"}
          width={"40%"}
          height={"80%"}
        >
          <Image
            src={imgMan}
            alt={"img bg"}
            width={200}
            style={imgManStyle}
            quality={100}
          />
        </Box>

        <Flex
          width={"37%"}
          height={"80%"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"fixed"}
          right={"11%"}
          top={"6rem"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            width={"75%"}
            height={"60%"}
            bg={"#7128d1"}
            rounded={"1rem"}
          >
            <Flex direction={"column"} width={"90%"} gap={2}>
              <FormControl id="email" isRequired isInvalid={emailError}>
                <FormLabel color={"gray.100"} ml={1}>
                  E-mail
                </FormLabel>
                <Input
                  required
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type="email"
                  {...register("email")}
                  onChange={(e) => setInputEmail(e.target.value)}
                />
                {!emailError ? (
                  <FormHelperText color={"gray.800"} ml={1} fontSize={13}>
                    Digite seu e-mail
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="password" isRequired isInvalid={passwordError}>
                <FormLabel ml={1} color={"gray.100"}>
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    required
                    focusBorderColor="blue.300"
                    errorBorderColor="red.300"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!passwordError ? (
                  <FormHelperText color={"gray.800"} ml={1} fontSize={13}>
                    Digite sua senha
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <HStack>
              <Button
                size="lg"
                variant={"violet"}
                onClick={handleSubmit(onFormSubmit)}
              >
                Login
              </Button>
            </HStack>
          </Box>
        </Flex>

        <Image
          src={imgTelaBranca}
          alt={"img bg"}
          style={imgStyle}
          quality={100}
        />
      </Box>
    </Flex>
  );
};

export default Login;
