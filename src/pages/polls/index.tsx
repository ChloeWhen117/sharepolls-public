import { type NextPage } from "next";
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

const Polls: NextPage = () => {
  return (
    <MainLayout
      alerts={
        <Alert
          type="info"
          message="Known Bugs: Vote not updating immediately for page"
        />
      }
    >
      <div className="flex h-full w-full justify-center">
        <div className="flex h-full w-full max-w-5xl flex-col">
          <PublicPolls />
        </div>
      </div>
    </MainLayout>
  );
};

export default Polls;
