import { useState } from "react";

import { Box, Flex, Stack } from "@chakra-ui/react";

import { Brand } from "./Brand";
import { MenuItem } from "./MenuItem";
import { MenuToggle } from "./MenuToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={5}
      bg={"white"}
      color={"black"}
      boxShadow="md"
    >
      <Brand />
      <MenuToggle isOpen={isOpen} toggle={toggle} />

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/events">Events</MenuItem>
        </Stack>
      </Box>
    </Flex>
  );
};
