import { useAuth } from "@/context/authContext";
import { iContactResponse } from "@/types";
import { Flex, HStack, List, ListItem, Text } from "@chakra-ui/react";

const Dash = () => {
  const { allContacts, ContactItem } = useAuth();

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"90.2vh"}
      bg={"rgb(55,13,89)"}
      bgGradient={
        "radial-gradient(circle, rgba(55,13,89) 14%, rgba(72,21,121,1) 41%, rgba(118,21,148,1) 77%)"
      }
    >
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"80%"}
        width={"40%"}
        gap={5}
        color={"gray.200"}
        bg={"gray.200"}
        rounded={"1rem"}
      >
        <HStack width={"90%"} height={"50px"} pl={5}>
          <Text color={"gray.800"} fontSize={"xl"} fontWeight={"semibold"}>
            Agenda
          </Text>
        </HStack>
        <List
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          height={"80%"}
          maxHeight={"400px"}
          width={"90%"}
          mb={"1rem"}
          borderColor={"#b02be5"}
          border={"2px solid"}
          overflowY={"scroll"}
        >
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
      </Flex>
    </Flex>
  );
};

export default Dash;
