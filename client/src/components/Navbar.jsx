import {
  Box,
  Flex,
  Icon,
  ListItem,
  UnorderedList,
  Text,
  Button,
  useColorModeValue,
  Avatar,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { ColorModeSwitcher } from "./ColorModeSwitch";
import { FaCode } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { useGoogleLogin } from "@react-oauth/google";
import { decodeToken } from "react-jwt";
import { get } from "axios";

function Navbar({ children }) {
  const { auth, setAuth } = useAuth();
  const bg = useColorModeValue("primary-light.200", "primary-dark.300");
  const color = useColorModeValue("primary-light.400", "primary-dark.200");
  const profilebg = useColorModeValue("primary-light.100", "primary-dark.400");
  const SignIn = useGoogleLogin({
    onError: (error) => {
      throw error;
    },
    onSuccess: async ({ access_token }) => {
      const result = await get(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "GET",
        headers: { token: access_token },
      });
      const { jwt } = result.data;
      localStorage.setItem("jwt", jwt);
      setAuth(decodeToken(jwt));
    },
  });

  async function SignOut() {
    try {
      localStorage.removeItem("jwt");
      setAuth(null);
    } catch (error) {}
  }

  return (
    <>
      <Flex padding="4" backgroundColor={bg} color={color}>
        <Box width="70%">
          <Link
            href="/"
            fontSize="xl"
            textTransform="uppercase"
            display="flex"
            alignItems="center"
          >
            Code Share
            <Icon marginLeft="2" fontSize="lg" as={FaCode} />
          </Link>
        </Box>
        <Box width="30%">
          <UnorderedList
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            listStyleType="none"
            gap="1rem"
          >
            <ListItem>
              <ColorModeSwitcher />
            </ListItem>
            {auth && (
              <>
                <ListItem
                  display="flex"
                  background={profilebg}
                  padding="0.5rem"
                  height="auto"
                  borderRadius="3xl"
                  alignItems="center"
                >
                  <Avatar
                    size="sm"
                    marginRight="2"
                    name={auth.name}
                    src={auth.image}
                  />
                  {auth.name}
                </ListItem>
                <ListItem>
                  <Link href="/my-links">Previous Links</Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <Button
                as={motion.button}
                background="white"
                onClick={() => (!auth ? SignIn() : SignOut())}
                initial={{ opacity: "0.7" }}
                whileHover={{ opacity: "1", scale: 1.2 }}
              >
                {!auth ? "Sign In" : "Sign Out"}
              </Button>
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
      {children}
    </>
  );
}

export default Navbar;
