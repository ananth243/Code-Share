import {
  Box,
  Flex,
  Icon,
  ListItem,
  UnorderedList,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ColorModeSwitcher } from "./ColorModeSwitch";
import { auth as firebaseAuth } from "../config/Firebase";
import { FaCode } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";

function Navbar({ children }) {
  const { auth, setAuth } = useAuth();
  const bg = useColorModeValue("primary-light.200", "primary-dark.300");
  const color = useColorModeValue("primary-light.400", "primary-dark.200");

  async function SignIn() {
    try {
      const google = new GoogleAuthProvider();
      const { user } = await signInWithPopup(firebaseAuth, google);
      setAuth(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function SignOut() {
    try {
      await signOut(firebaseAuth);
      setAuth(null);
    } catch (error) {}
  }

  return (
    <>
      <Flex padding="4" backgroundColor={bg} color={color}>
        <Box width="70%">
          <Text fontSize="xl" textTransform="uppercase">
            Codify
            <Icon marginLeft="2" fontSize="lg" as={FaCode} />
          </Text>
        </Box>
        <Box width="30%">
          <UnorderedList
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            listStyleType="none"
          >
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

            <ListItem>
              <ColorModeSwitcher />
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
      {children}
    </>
  );
}

export default Navbar;
