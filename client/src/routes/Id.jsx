import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, useToast, Flex, IconButton, Tag } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

function Id() {
  const { id } = useParams();
  const [code, setCode] = useState(null);
  const [lang, setLang] = useState(null);
  const alert = useToast();
  useEffect(() => {
    async function fetchCode() {
      try {
        const result = await fetch(import.meta.env.VITE_BACKEND_URL + "/" + id);
        const { code, lang } = await result.json();
        setCode(code);
        setLang(lang);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCode();
  }, [id]);

  async function Copy() {
    try {
      await navigator.clipboard.writeText(code);
      alert({
        title: "Copied",
        description: "Code copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      alert({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    lang &&
    code && (
      <Box padding="3">
        <Flex gap="2" marginBottom="3">
          <IconButton icon={<FaCopy />} onClick={Copy} />{" "}
          <Tag>{lang.toUpperCase()}</Tag>
        </Flex>
        <pre>
          <code>{code}</code>
        </pre>
      </Box>
    )
  );
}

export default Id;
