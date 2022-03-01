import { extendTheme } from '@chakra-ui/react';
import { mode, darken, whiten } from '@chakra-ui/theme-tools';

const NotesListBox = {
  baseStyle: ({ colorMode }) => ({
    borderRight: '1px solid',
    borderColor: colorMode === 'dark' ? 'gray.200' : 'gray.800',
  }),
};

const Divider = {
  baseStyle: ({ colorMode }) => ({
    borderRight: '1px solid',
    borderColor: colorMode === 'dark' ? 'gray.200' : 'gray.800',
  }),
};

const Button = {
  // Styles for the base style
  baseStyle: {
    borderRadius: 'xl',
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
      border: '1px solid',
      borderColor: 'iris.100',
      outline: '0',
      _hover: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    avatar: (props) => ({
      border: '1px solid',
      borderColor: 'iris.100',
      p: '0',
      _hover: {
        bg: mode(darken('gray.200', 10), whiten('gray.800', 10))(props),
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    toolbar: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
      border: 'none',
      borderColor: 'iris.100',
      _hover: {
        bg: mode(darken('gray.200', 10), whiten('gray.800', 10))(props),
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    cardEditButton: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      border: 'none',
      borderColor: 'iris.100',
      borderRadius: '5px',
      _hover: {
        bg: '#7879F1',
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    cardDeleteButton: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      border: 'none',
      borderColor: 'iris.100',
      borderRadius: '5px',
      _hover: {
        bg: mode(darken('red.200', 10), whiten('red.800', 10))(props),
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    cardDeletePopUpButton: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'red.900' : 'red.100',
      border: '1px solid',
      borderColor: 'iris.100',
      outline: '0',
      _hover: {
        bg: props.colorMode === 'dark' ? 'red.800' : 'red.200',
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    cardTagsButton: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      border: 'none',
      borderColor: 'iris.100',
      _hover: {
        bg: mode(darken('gray.200', 10), whiten('gray.700', 10))(props),
      },
      _focus: {
        boxShadow: '0',
      },
    }),
    dashboardTagsButton: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      border: 'none',
      borderColor: 'iris.100',
      textAlign: 'left',
      borderRadius: '5px',

      _hover: {
        bg: mode(darken('gray.200', 10), whiten('gray.700', 10))(props),
      },
      _focus: {
        boxShadow: '0',
      },
      _active: {},
    }),
    notelistTitleButton: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      border: 'none',
      borderColor: 'iris.100',
      textAlign: 'left',
      justifyContent: 'left',
      borderRadius: '5px',
      _hover: {
        bg: mode(darken('gray.200', 10), whiten('gray.700', 10))(props),
      },
      _focus: {
        boxShadow: '0',
      },
      _active: {},
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};

const Link = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: (props) => ({
      _hover: {
        textDecoration: 'none',
      },
      _focus: {
        boxShadow: '0',
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};

const theme = extendTheme({
  colors: {
    fuschia: {
      100: '#F178B6',
      200: '#EF5DA8',
      300: '#FCDDEC',
    },
    iris: {
      100: '#7879F1',
      200: '#A5A6F6',
      300: '#5D5FEF',
    },
  },

  fonts: {
    heading: 'Prompt',
    body: 'Inter',
  },

  styles: {
    global: (props) => ({
      // styles for the `body`
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
      },
      // styles for the `a`
      a: {
        color: 'red.500',
        _hover: {
          textDecoration: 'underline',
        },
        _focus: {
          boxShadow: '0',
        },
      },
    }),
  },

  components: {
    Button,
    Link,
    NotesListBox,
    Divider,
  },
});

export default extendTheme(theme);
