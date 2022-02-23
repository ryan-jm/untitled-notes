import { extendTheme } from '@chakra-ui/react';
import { mode, darken, whiten } from '@chakra-ui/theme-tools';
import { NodeNextRequest } from 'next/dist/server/base-http';

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
      },
    }),
  },

  components: {
    Button,
  },
});

export default extendTheme(theme);

// Colour-scheme:
// Primary:
// fuschia-main: #F178B6
// fuschia-darkmode: #FCDDEC
// fuschia-lightmode: #EF5DA8
// Secondary:
// iris-main: #7879F1
// iris-darkmode: #5D5FEF
// iris-lightmode: #A5A6F6
// Fonts:
// Headers/large:
// Prompt
// 400-800 font weight
// Main/body:
// Inter
// 200-400 font weight

// styles: {
//   global: (props) => ({
//     // styles for the `body`
//     body: {
//       bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
//       color: props.colorMode !== 'dark' ? 'gray.900' : 'gray.100',
//     },
//     // styles for the `a`
//     a: {
//       color: 'red.500',
//       _hover: {
//         textDecoration: 'underline',
//       },
//     },
//   }),
// },
