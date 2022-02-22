import { extendTheme } from '@chakra-ui/react';

const overrides = {
  styles: {
    global: {
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
};

export default extendTheme(overrides);
