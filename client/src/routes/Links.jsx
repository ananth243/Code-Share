import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { get } from "axios";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Container,
  Center,
  Link,
  Tag,
  useToast,
} from "@chakra-ui/react";

function Links() {
  const { auth, setAuth } = useAuth();
  const [links, setLinks] = useState(null);
  const alert = useToast();
  useEffect(() => {
    async function fetchLinks() {
      try {
        if (auth) {
          const res = await get(
            import.meta.env.VITE_BACKEND_URL + "/all-links",
            {
              headers: { token: localStorage.getItem("jwt") },
            }
          );
          setLinks(res.data.links);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAuth(false);
          localStorage.removeItem("jwt");
          setLinks(null);
        } else if (error.response) {
          alert({
            title: "Error",
            description: error.response.data.error,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else
          alert({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
      }
    }
    fetchLinks();
  }, [auth]);

  return (
    <Container maxW="container.xl" padding="2" marginTop="2">
      {links && auth && (
        <>
          <Text fontSize="xl">TOTAL: {links.count}</Text>
          {links.count === 0 && <Text fontSize="xl">No links found :(</Text>}
          <Accordion allowToggle>
            {links.rows.map((link) => (
              <AccordionItem marginTop="2" key={link.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Link href={link.url}>{link.url}</Link>
                      <Tag marginLeft="3" textTransform="uppercase">
                        {link.lang}
                      </Tag>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <pre>
                    <code>{link.code}</code>
                  </pre>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
      {!auth && (
        <Center>
          <Text>Sign In to view your saved links!</Text>
        </Center>
      )}
    </Container>
  );
}

export default Links;
