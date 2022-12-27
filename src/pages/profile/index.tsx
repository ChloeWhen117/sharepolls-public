import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import { useUserId } from "@/hooks/useUserId";
import { PollListCard } from "@/components/PollCard/PollListCard";

const UserPolls: React.FC = () => {
  const { userId } = useUserId();
  const {
    data: userPolls,
    isLoading,
    refetch,
  } = trpc.poll.getByAuthorId.useQuery(
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
  return (
    <div className="container flex flex-col gap-4 p-24">
      {userPolls?.length > 0 &&
        userPolls.map((poll) => {
          return (
            <React.Fragment key={poll.id}>
              <PollListCard poll={poll} refetch={refetch} />
            </React.Fragment>
          );
        })}
    </div>
  );
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
          className="mr-2 inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
        >
          Return Home
        </button>
      }
    >
      <div className="flex w-full flex-col">
        <UserPolls />
      </div>
    </MainLayout>
  );
};

export default Home;
