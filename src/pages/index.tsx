import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { PollOptions } from "./components/PollOptions/PollOptions";
import { CreatePoll } from "./components/CreatePoll/CreatePoll";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  /*
  const {
    data: pollOptions,
    refetch,
    isLoading,
  } = trpc.useQuery(["pollOptions"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  */

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] p-4">
            Share Polls
        </h1>
        <div className="container flex flex-col items-center justify-center gap-12 p-24 bg-white/10">
          <div className="flex" >
            <div className="text-2xl text-center text-white">Insert Poll Question</div>
          </div>
          <PollOptions />
          <CreatePoll />
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

// type OptionsFromServer = inferQueryResponse<"get-poll">["firstPoll"];

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
