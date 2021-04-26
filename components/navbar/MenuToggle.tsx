import { FaBars, FaTimes } from "react-icons/fa";

import { Box } from "@chakra-ui/react";

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box
      display={{ base: "block", lg: "none" }}
      onClick={toggle}
      cursor="pointer"
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </Box>
  );
};
