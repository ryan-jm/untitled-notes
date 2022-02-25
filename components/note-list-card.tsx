import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Fade, Button ,Box } from '@chakra-ui/react'
const ListCard = () => {
  const [show, setShow] =useState(false);
  const { isOpen , onToggle } = useDisclosure();
  return (
    <>
      <button>DELETE</button>
      <Button onClick={onToggle}>Click Me</Button>
      <Fade in={isOpen}>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          Fade
        </Box>
      </Fade>
    </>
  );
};

export default ListCard;
