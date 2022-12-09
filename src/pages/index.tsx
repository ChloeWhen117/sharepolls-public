import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { trpc } from "../utils/trpc"
import { MainLayout } from "../layouts/MainLayout"

const PublicPolls = () => {
  const { data: publicPolls, isLoading }  = trpc.poll.getAll.useQuery(
    undefined, // no input
    {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  
  if (isLoading) return <div className="flex text-white">Fetching messages...</div>;
  if (!publicPolls || publicPolls?.length === 0) return <div className="flex text-white">No Public Polls Found</div>;
  return (
    <div className="flex max-w-2xl items-left ">
        <div className="flex flex-col flex-start">
            {  publicPolls?.length > 0 && (
                publicPolls.map((poll, idx) => {
                return <div> Test {idx} </div>
            }))}
        </div>
    </div>
)   
}

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout 
      actionsBar={
        <>
          <button
            onClick={() => router.push('/profile')}
            type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
          >
            User Profile
          </button>
          <button
            onClick={() => router.push('/new')}
            type="button"
            className="disabled:bg-gray-300 focus:outline-none text-white bg-emerald-500 hover:bg-opacity-95 focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-emerald-500 dark:focus:ring-emerald-500 inline-flex items-center text-center"
          >
            New Poll
          </button>
        </>
        }
    >
        <div className="container flex flex-col items-center justify-center gap-12 p-24">
          <div className="flex" >
            <PublicPolls />
          </div>
        </div>
    </MainLayout>
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
