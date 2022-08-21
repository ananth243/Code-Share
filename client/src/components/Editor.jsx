import { Textarea, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

function Editor() {
  const navigate = useNavigate();
  const bg = useColorModeValue("primary-dark.100", "primary-dark.400");
  const { setAuth } = useAuth();
  return (
    <Textarea
      onFocus={(e) => {
        e.target.style.outline = "none";
        e.target.style.border = "none";
      }}
      height="100%"
      fontSize="xl"
      backgroundColor={bg}
      onKeyDownCapture={async (e) => {
        if (e.ctrlKey && e.key === "s") {
          e.preventDefault();
          try {
            // Post data
            let obj = {
              content: e.target.value,
            };
            if (localStorage.getItem("jwt"))
              obj.jwt = localStorage.getItem("jwt");
            const result = await post(
              import.meta.env.VITE_BACKEND_URL + "/add",
              obj,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            // Redirect to url
            navigate("/" + result.data.url);
          } catch (e) {
            if (error.response.status === 401) {
              localStorage.removeItem("jwt");
              setAuth(null);
            }
            console.error(e);
          }
        }
      }}
      placeholder={`Ctrl+S to save`}
    />
  );
}

export default Editor;
