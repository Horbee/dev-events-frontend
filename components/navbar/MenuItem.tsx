import Link from "next/link";

import { Box, Text } from "@chakra-ui/react";

type MenuItemProps = {
  to: string;
  text?: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ children, to, text }) => {
  return (
    <Link href={to}>
      <Box>
        {text && (
          <Text display="block" cursor="pointer">
            {text}
          </Text>
        )}
        {children}
      </Box>
    </Link>
  );
};
