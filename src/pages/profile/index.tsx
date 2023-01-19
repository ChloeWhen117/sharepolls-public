import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import { useUserId } from "@/hooks/useUserId";
import { PollsTable } from "@/components/PollsTable/PollsTable";

const UserPolls: React.FC = () => {
  const { userId } = useUserId();
  const { data: userPolls, isLoading } = trpc.poll.getByAuthorId.useQuery(
    { authorId: userId },
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
  if (!userPolls || userPolls?.length === 0)
    return (
      <div className="mx-auto flex justify-center text-white">
        No User Polls Found
      </div>
    );
  return <PollsTable polls={userPolls} />;
};

/* eslint-disable  no-unused-vars */
const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      actionsBar={
        <button
          onClick={() => router.push("/")}
          type="button"
          className="inline-flex items-center rounded-lg bg-blue-400 p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
        >
          Return Home
        </button>
      }
    >
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-5xl flex-col">
          <UserPolls />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
