import { useAuth } from "@/context/authContext";
import { iContactResponse } from "@/types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const ContactsList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allContacts, ContactItem } = useAuth();

  return (
    <>
      <Button variant="violet" onClick={onOpen}>
        Abrir
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={20} mb={0} h={530}>
          <HStack>
            <ModalHeader py={3}>Agenda</ModalHeader>
            <Button variant={"close"} onClick={onClose}>
              <CloseIcon />
            </Button>
          </HStack>
          <ModalBody py={0} px={0} ml={3} mr={1}>
            <List spacing={5} maxH={"400px"} overflowY={"scroll"}>
              {allContacts ? (
                allContacts.map((contact: iContactResponse) => (
                  <ContactItem
                    key={contact.email}
                    name={contact.name}
                    email={contact.email}
                    phone={contact.phone}
                  ></ContactItem>
                ))
              ) : (
                <ListItem>Agenda vazia</ListItem>
              )}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactsList;
