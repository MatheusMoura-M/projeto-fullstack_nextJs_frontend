import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iClientRegister } from "@/types";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/context/authContext";
import { formRegisterSchema } from "@/schemas";

const ModalRegister = () => {
  const { onRegister } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
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
  } = useAuth();

  const nameError = inputName === "";
  const emailError = inputEmail === "";
  const passwordError = inputPassword === "";
  const phoneError = inputPhone === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iClientRegister>({
    resolver: yupResolver(formRegisterSchema),
  });

  const onFormSubmit = (formData: iClientRegister) => {
    onRegister(formData);
  };

  return (
    <>
      <Button variant="default" onClick={onOpen}>
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faça seu Cadatro</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="name" isRequired isInvalid={nameError}>
              <FormLabel>Name</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("name")}
                onChange={(e) => setInputName(e.target.value)}
              />
              {!nameError ? (
                <FormHelperText>Digite seu nome</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Digite seu e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={passwordError}>
              <FormLabel>Password</FormLabel>
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
                <FormHelperText>Digite sua senha</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="phone" isRequired isInvalid={phoneError}>
              <FormLabel>Phone</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="number"
                {...register("phone")}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              {!phoneError ? (
                <FormHelperText>Digite seu telefone</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              variant={"default"}
              onClick={handleSubmit(onFormSubmit)}
              _hover={{
                bg: "blue.700",
              }}
            >
              Cadastrar
            </Button>
            <Button size="lg" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegister;
