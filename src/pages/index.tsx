import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import React from "react";
import { Alert } from "@/components/common/Alert/Alert";
import { PollsTable } from "@/components/PollsTable/PollsTable";

const PublicPolls: React.FC = () => {
  const { data: publicPolls, isLoading } = trpc.poll.getAll.useQuery(
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
  return <PollsTable polls={publicPolls} />;
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
            className="mr-2 inline-flex items-center rounded-lg bg-blue-400 p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
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
      <div className="flex h-full w-full justify-center">
        <div className="flex h-full w-full max-w-5xl flex-col">
          <div className="flex px-4 py-8">
            <Alert
              type="info"
              message="Known Bugs: Vote not updating immediately for page"
            />
          </div>
          <PublicPolls />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
