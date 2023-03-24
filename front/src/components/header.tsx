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
import ModalRegisterContact from "./modalContact";

const Links = ["Contatos", "About"];

interface IHeaderProps {
  isLogged?: boolean;
}

const Header = ({ isLogged = false }: IHeaderProps) => {
  const { NavLink } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const logout = () => {
    destroyCookie(null, "kenzie.token");
    router.push("/");
  };

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
            {isLogged ? (
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
            ) : (
              <Stack display={"none"}></Stack>
            )}
          </HStack>
          <Flex alignItems={"center"}>
            {isLogged ? (
              <HStack spacing={5}>
                <ModalRegisterContact />
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
                    display={"flex"}
                    maxH={"45px"}
                    bg={"#6b1885"}
                    _hover={{
                      bg: "#b02be5",
                      color: "white",
                    }}
                    transition="0.2s"
                    minW={"100px"}
                  >
                    <MenuItem
                      justifyContent={"center"}
                      bg={"none"}
                      color={"gray.200"}
                      onClick={() => logout()}
                      _hover={{
                        color: "gray.800",
                        transition: "0.2s",
                      }}
                      transition="0.2s"
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <HStack spacing={5}>
                <ModalForm />
                <ModalRegister />
              </HStack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={6} color={"white"}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
