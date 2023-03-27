import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import ModalForm from "./modalForm";
import { destroyCookie } from "nookies";
import { useAuth } from "@/context/authContext";
import ModalRegister from "./modalRegister";
import ModalRegisterContact from "./modalRegisterContact";

const Links = ["Contatos"];
const BtnDefault = ["Sair", "Perfil"];
const AllBtn = ["Contatos", "Sair", "Perfil"];

interface IHeaderProps {
  isLogged?: boolean;
}

const Header = ({ isLogged = false }: IHeaderProps) => {
  const { NavLink, MenuHamburguer } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={"rgb(211,100,245)"}
        bgGradient={
          "radial-gradient(circle, rgba(211,100,245,1) 0%, rgba(182,141,222,1) 45%, rgba(195,153,204,1) 87%)"
        }
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontWeight={"bold"} fontSize={20} color={"gray.800"}>
                Kenzie
              </Text>
            </Box>
            {isLogged && (
              <HStack
                color={"white"}
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            )}
          </HStack>
          <Flex alignItems={"center"}>
            {isLogged ? (
              <>
                <ModalRegisterContact />
                <HStack
                  flexDirection={"column"}
                  position={"absolute"}
                  top={"1rem"}
                  right={"1rem"}
                  alignItems={"flex-end"}
                  gap={"0.5rem"}
                >
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar size={"sm"} />
                    </MenuButton>
                    <MenuList
                      display={{ base: "none", md: "flex" }}
                      flexDirection={"column"}
                      maxH={"max-content"}
                      bg={"#6b1885"}
                      _hover={{
                        color: "white",
                      }}
                      transition="0.2s"
                      minW={"100px"}
                    >
                      {BtnDefault.map((link) => (
                        <MenuHamburguer key={link}>{link}</MenuHamburguer>
                      ))}
                    </MenuList>
                    <MenuList
                      display={{ base: "flex", md: "none" }}
                      flexDirection={"column"}
                      maxH={"max-content"}
                      bg={"#6b1885"}
                      _hover={{
                        color: "white",
                      }}
                      transition="0.2s"
                      minW={"100px"}
                    >
                      {AllBtn.map((link) => (
                        <MenuHamburguer key={link}>{link}</MenuHamburguer>
                      ))}
                    </MenuList>
                  </Menu>
                </HStack>
              </>
            ) : (
              <HStack spacing={5}>
                <ModalForm />
                <ModalRegister />
              </HStack>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
