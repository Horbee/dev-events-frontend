import { FaBackward, FaForward } from "react-icons/fa";

import { Button, Flex } from "@chakra-ui/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange
}: PaginationProps) => {
  const onNextPageClick = () => onPageChange(page + 1);
  const onPrevPageClick = () => onPageChange(page - 1);

  return (
    <Flex mt="4">
      {page > 1 && (
        <Button
          onClick={onPrevPageClick}
          size="sm"
          leftIcon={<FaBackward />}
          mr="auto"
        >
          Prev Page
        </Button>
      )}
      {page < totalPages && (
        <Button
          onClick={onNextPageClick}
          size="sm"
          rightIcon={<FaForward />}
          ml="auto"
        >
          Next Page
        </Button>
      )}
    </Flex>
  );
};
