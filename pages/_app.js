import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useAuthState, useGetProfile } from "../src/lib/actions";
import { ThemeProvider, StylesProvider } from "../src/providers";
import RootLayout from "./RootLayout";
import React from 'react';
import './global.css';
import Head from 'next/head';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  useAuthState();
  useGetProfile();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <ToastContainer />
        <ThemeProvider>
          <StylesProvider />
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
