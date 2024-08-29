// pages/_app.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useAuthState, useGetProfile } from "../src/lib/actions";
import { ThemeProvider, StylesProvider } from "../src/providers";
import  "../src/index.css"

import React from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  useAuthState();
  useGetProfile();

  return (

    <QueryClientProvider client={queryClient}>
      <div className="app">
        <StylesProvider />
        <ToastContainer />

        <ThemeProvider>
        <Component {...pageProps} />
        </ThemeProvider> 

       
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
