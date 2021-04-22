import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export const Search = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

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
        />
        <Input
          type="text"
          placeholder="Search events..."
          size="md"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};
