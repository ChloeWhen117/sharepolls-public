import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { PollOptions } from "./components/PollOptions";

const exampleOptions = [
  {id: 1, value: "Option A"},
  {id: 2, value: "Option B"},
  {id: 3, value: "Option C"},
  {id: 4, value: "Option D"}
]

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const options = exampleOptions;
  return (
    <>
      <Head>
        <title>Share Polls</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] p-4">
            Share Polls
        </h1>
        <div className="container flex flex-col items-center justify-center gap-12 p-4 bg-white/10">
          <div className="flex" >
            <div className="text-2xl text-center text-white pt-8">Insert Poll Question</div>
          </div>
          <div className="flex max-w-2xl items-left ">
            <div className="flex flex-col flex-start">
              <PollOptions options={options} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
      <footer id="linksFooter" className="max-w-ws flex text-xl text-center item-center justify-center p-2 gap-4 bg-[#15162c]">
          <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/https://github.com/ChloeWhen117/sharecattv"
          >
            <div>Github</div>
          </Link>
          <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/results"
          >
            <div>Results</div>
          </Link>
          <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/about"
          >
            <div>About</div>
          </Link>
      </footer>
    </>
  );
};

export default Home;

const AuthShowcase = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
