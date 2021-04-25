import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Input, InputGroup, InputLeftElement, useBreakpointValue } from "@chakra-ui/react";

export const Search = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });
  const inputElementSize = useBreakpointValue({ base: "8", md: "10" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch color="gray" />}
          width={inputElementSize}
          height={inputElementSize}
        />
        <Input
          type="text"
          placeholder="Search events..."
          size={inputSize}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};
