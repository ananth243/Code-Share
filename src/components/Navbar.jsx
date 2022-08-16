import { Box } from "@chakra-ui/react";
import React from "react";
import {ColorModeSwitcher} from './ColorModeSwitch';

function Navbar({ children }) {
  return (
    <>
      <Box backgroundColor="dark">Navbar</Box>
      <ColorModeSwitcher />
      {children}
    </>
  );
}

export default Navbar;
