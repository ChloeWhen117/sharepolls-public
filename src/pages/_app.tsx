import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
//import PlausibleProvider from "next-plausible";
import { setUserIdToLocalStorage } from "@/utils/userId";
import { isBrowser } from "@/utils/isBrowser";

import { trpc } from "@/utils/trpc";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const description = "Web app for sharing polls";
  const title = "Share Polls";
  if (isBrowser) setUserIdToLocalStorage();
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
