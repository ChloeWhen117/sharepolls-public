import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import React from "react";
import { PollListCard } from "@/components/PollCard/PollListCard";

const PublicPolls: React.FC = () => {
  const {
    data: publicPolls,
    isLoading,
    refetch,
  } = trpc.poll.getAll.useQuery(
    undefined, // no input
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading)
    return (
      <div className="mx-auto flex justify-center text-white">
        Fetching messages...
      </div>
    );
  if (!publicPolls || publicPolls?.length === 0)
    return (
      <div className="mx-auto flex justify-center text-white">
        No Public Polls Found
      </div>
    );
  return (
    <div className="container flex flex-col gap-4 p-24">
      {publicPolls?.length > 0 &&
        publicPolls.map((poll) => {
          return (
            <React.Fragment key={poll.id}>
              <PollListCard poll={poll} refetch={refetch} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      actionsBar={
        <>
          <button
            onClick={() => router.push("/profile")}
            type="button"
            className="mr-2 inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
          >
            User Profile
          </button>
          <button
            onClick={() => router.push("/new")}
            type="button"
            className="inline-flex items-center rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus:ring-4 focus:ring-emerald-500 disabled:bg-gray-300 dark:bg-emerald-500 dark:focus:ring-emerald-500"
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
