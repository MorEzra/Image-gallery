import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reduce, { AppState } from './redux/reducer';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme.js";
import './index.scss';
import App from './App';

const URL = "http://localhost:3001";

const store = configureStore({ reducer: Reduce, AppState });

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App URL={URL} />
    </ThemeProvider>
  </Provider>
);