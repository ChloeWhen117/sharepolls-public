import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import { PollDetails } from "@/components/PollDetails/PollDetails";

import React from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const pollId = router.query.id as string;
  const { data: poll } = trpc.poll.getByPollId.useQuery(
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
            className="mr-2 inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
          >
            Return Home
          </button>
        </>
      }
    >
      {poll && <PollDetails poll={poll} />}
    </MainLayout>
  );
};

export default Home;
