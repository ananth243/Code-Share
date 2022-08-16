import {
  Box,
  Flex,
  Icon,
  ListItem,
  UnorderedList,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { ColorModeSwitcher } from "./ColorModeSwitch";
import { FaCode } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";

function Navbar({ children }) {
  const { auth, setAuth } = useAuth();

  function SignIn() {
    console.log('Sign In');
    setAuth(true);
  }

  function SignOut() {
    console.log("Sign Out");
    setAuth(false);
  }
  
  return (
    <>
      <Flex padding="4">
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
