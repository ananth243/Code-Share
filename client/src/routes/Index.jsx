import React, { useState } from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";
import Editor from "../components/Editor";

function Index() {
  const [intro, setIntro] = useState(localStorage.getItem("intro"));
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="93vh"
    >
      {!intro && (
        <Box>
          <Flex alignItems="center" fontSize="5xl">
            <Text textTransform="uppercase">Codify</Text>
            <Icon marginLeft="1" as={FaCode} />
          </Flex>
          <Text fontSize="xl">
            Welcome to Codify. A platform for sharing code.
            <br />
            Sign in to save your links! Links are deleted automatically after
            every 72 hours if they are not saved!
          </Text>
          <Button
            marginTop="2rem"
            onClick={() => {
              localStorage.setItem("intro", "true");
              setIntro(true);
            }}
          >
            Create Link
          </Button>
        </Box>
      )}
      {intro && <Editor />}
    </Box>
  );
}

export default Index;
