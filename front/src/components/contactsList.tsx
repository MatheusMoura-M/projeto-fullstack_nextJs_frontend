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
} from "@chakra-ui/react";

const ContactsList = () => {
  const {
    allContacts,
    ContactItem,
    isContainsContacts,
    setIsContainsContacts,
  } = useAuth();

  return (
    <>
      <Modal
        isOpen={isContainsContacts}
        onClose={() => setIsContainsContacts(false)}
      >
        <ModalOverlay />
        <ModalContent mt={20} mb={0} pb={5} h={"max-content"}>
          <HStack justifyContent={"space-between"} mr={4}>
            <ModalHeader py={3}>Agenda</ModalHeader>
            <Button
              variant={"close"}
              onClick={() => setIsContainsContacts(false)}
              minW={8}
              maxH={27}
            >
              <CloseIcon fontSize={10} />
            </Button>
          </HStack>
          <ModalBody py={0} px={0} ml={3} mr={1}>
            <List spacing={5} maxH={"400px"} overflowY={"scroll"}>
              {allContacts ? (
                allContacts.map((contact: iContactResponse) => (
                  <ContactItem
                    key={contact.email}
                    id={contact.id}
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
