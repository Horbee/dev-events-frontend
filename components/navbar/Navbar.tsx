import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

import { Box, Button, Flex, Stack } from "@chakra-ui/react";

import { Brand } from "./Brand";
import { MenuItem } from "./MenuItem";
import { MenuToggle } from "./MenuToggle";
import { Search } from "./Search";

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
      <Search />
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
          <MenuItem to="/events" text="Events" />
          <MenuItem to="/events/add" text="Add Event" />
          <MenuItem to="/account/login">
            <Button leftIcon={<FaSignInAlt />} size="sm" colorScheme="red">
              Login
            </Button>
          </MenuItem>
        </Stack>
      </Box>
    </Flex>
  );
};
