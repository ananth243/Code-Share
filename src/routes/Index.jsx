import React from "react";
import { Box, Button, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";

function Index() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="80vh"
    >
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
        <Button marginTop="2rem">Create Link</Button>
      </Box>
    </Box>
  );
}

export default Index;
