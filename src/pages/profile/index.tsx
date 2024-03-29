import React from "react";
import { type NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { MainLayout } from "@/layouts/MainLayout";
import { useUserId } from "@/hooks/useUserId";
import { PollsTable } from "@/components/PollsTable/PollsTable";
import { Alert } from "@/components/common/Alert/Alert";

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
  return (
    <MainLayout
      alerts={
        <Alert
          type="info"
          message="Known Bugs: Vote not updating immediately for page"
        />
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
