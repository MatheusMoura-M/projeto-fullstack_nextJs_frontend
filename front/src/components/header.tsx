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

const Links = ["Posts", "Tags", "About"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "blue.300",
      color: "white",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

interface IHeaderProps {
  isLogged?: boolean;
}

const Header = ({ isLogged = false }: IHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const logout = () => {
    destroyCookie(null, "kenzie.token");
    router.push("/");
  };

  return (
    <>
      <Box bg={"blue.600"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontWeight={"bold"} fontSize={20} color={"white"}>
                Kenzie
              </Text>
            </Box>
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
          </HStack>
          <Flex alignItems={"center"}>
            {isLogged ? (
              <>
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
                  <MenuList bg={"blue.600"}>
                    <MenuItem
                      bg={"blue.600"}
                      color={"white"}
                      onClick={() => logout()}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <ModalForm />
                <ModalRegister />
              </>
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
