import { type NextPage } from "next";
import { useRouter } from 'next/router';
import { trpc } from "../utils/trpc"
import { MainLayout } from "../layouts/MainLayout"
import React from "react";
import { PollListCard } from "../components/PollCard/PollListCard"

const PublicPolls:React.FC = () => {
  const { data: publicPolls, isLoading }  = trpc.poll.getAll.useQuery(
    undefined, // no input
    {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  
  if (isLoading) return <div className="flex text-white justify-center mx-auto">Fetching messages...</div>;
  if (!publicPolls || publicPolls?.length === 0) return <div className="flex text-white justify-center mx-auto">No Public Polls Found</div>;
  return (
    <div className="container flex flex-col gap-4 p-24">
          {  publicPolls?.length > 0 && (
              publicPolls.map((poll) => {
                return (
                  <React.Fragment key={poll.id}>
                    <PollListCard poll={poll} />
                  </React.Fragment>
                )
              }
          ))}
    </div>
)}

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
      <PublicPolls />
    </MainLayout>
  );
};

export default Home;