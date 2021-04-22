import Link from "next/link";

import { Text } from "@chakra-ui/react";

type MenuItemProps = {
  to: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ children, to }) => {
  return (
    <Link href={to}>
      <Text display="block" cursor="pointer">
        {children}
      </Text>
    </Link>
  );
};
