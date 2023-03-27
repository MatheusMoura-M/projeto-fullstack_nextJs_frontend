import { useAuth } from "@/context/authContext";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

const ModalClient = () => {
  const { client, isContainsClient, setIsContainsClient, ClientItem } =
    useAuth();

  return (
    <>
      <Modal
        isOpen={isContainsClient}
        onClose={() => setIsContainsClient(false)}
      >
        <ModalOverlay />
        <ModalContent mt={20} mb={0} pb={5} h={"max-content"}>
          <HStack justifyContent={"space-between"} mr={4}>
            <ModalHeader py={3}>Perfil</ModalHeader>
            <Button
              variant={"close"}
              onClick={() => setIsContainsClient(false)}
              minW={8}
              maxH={27}
            >
              <CloseIcon fontSize={10} />
            </Button>
          </HStack>
          <ModalBody py={0} px={0} ml={3} mr={1}>
            <Box>
              {client &&
                client.map((elem) => (
                  <ClientItem
                    key={elem.email}
                    id={elem.id}
                    name={elem.name}
                    email={elem.email}
                    phone={elem.phone}
                  ></ClientItem>
                ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalClient;
