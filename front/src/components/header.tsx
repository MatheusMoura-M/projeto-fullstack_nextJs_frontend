import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import ModalForm from "./modalForm";
import { useAuth } from "@/context/authContext";
import ModalRegister from "./modalRegister";
import ModalRegisterContact from "./modalRegisterContact";
import Image from "next/image";
import imgAgenda from "../../public/assets/img_agenda.png";

const BtnDefault = ["Perfil", "Sair"];

export interface IHeaderProps {
  isLogged?: boolean;
}

const Header = ({ isLogged = false }: IHeaderProps) => {
  const { NavLink, MenuHamburguer } = useAuth();

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
            <Box
              display={"flex"}
              boxSize={14}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image width={45} src={imgAgenda} alt="img" />
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            {isLogged ? (
              <>
                <ModalRegisterContact />
                <HStack
                  flexDirection={"column"}
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
                    {/* <MenuList
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
                    </MenuList> */}
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
