import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iContactRegister } from "@/types";
import { useAuth } from "@/context/authContext";
import { formUpdateContactSchema } from "@/schemas";

const ModalUpdateContact = () => {
  const { onUpdateContact, showModalUpdateContact, setShowModalUpdateContact } =
    useAuth();

  const { register, handleSubmit } = useForm<iContactRegister>({
    resolver: yupResolver(formUpdateContactSchema),
  });

  const onFormSubmit = (formData: iContactRegister) => {
    onUpdateContact(formData);
  };

  return (
    <Box position={"absolute"} right={"4rem"}>
      <Modal
        isOpen={showModalUpdateContact}
        onClose={() => setShowModalUpdateContact(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualize seu contato</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("name")}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="email"
                {...register("email")}
              />
            </FormControl>

            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Input
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="text"
                {...register("phone")}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              variant={"violet"}
              onClick={handleSubmit(onFormSubmit)}
            >
              Atualizar
            </Button>
            <Button size="lg" onClick={() => setShowModalUpdateContact(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalUpdateContact;
