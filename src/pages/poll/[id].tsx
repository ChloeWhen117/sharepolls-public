import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import { PollDetails } from "@/components/PollDetails/PollDetails";

import React from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const pollId = router.query.id as string;
  const {
    data: poll,
    isLoading,
    refetch,
  } = trpc.poll.getByPollId.useQuery(
    { id: pollId }, // no input
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <MainLayout
      actionsBar={
        <>
          <button
            onClick={() => router.push("/")}
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-400 p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
          >
            Return Home
          </button>
        </>
      }
    >
      <PollDetails poll={poll} isLoading={isLoading} refetchPoll={refetch} />
    </MainLayout>
  );
};

export default Home;
