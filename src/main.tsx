import './index.css';
import './firebase.ts';

import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App.tsx';
import { AuthProvider } from './contexts';

const customTheme = extendTheme(
  {
    colors: {
      brand: {
        50: '#f4e7ff',
        100: '#e4c4ff',
        200: '#d09efb',
        300: '#ba79f3',
        400: '#a95eeb',
        500: '#9a47e3',
        600: '#8943dc',
        700: '#713ed2',
        800: '#5b3ac9',
        900: '#2932b9',
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={customTheme}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ChakraProvider>,
);
