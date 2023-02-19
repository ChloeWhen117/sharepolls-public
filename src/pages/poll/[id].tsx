import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import { PollDetails } from "@/components/PollDetails/PollDetails";

import React from "react";

const UniquePoll: NextPage = () => {
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
    <MainLayout>
      <PollDetails poll={poll} isLoading={isLoading} refetchPoll={refetch} />
    </MainLayout>
  );
};

export default UniquePoll;
