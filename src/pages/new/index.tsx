import { type NextPage } from "next";
import { useRouter } from "next/router";
import { MainLayout } from "@/layouts/MainLayout";
import { CreatePoll } from "@/components/CreatePoll/CreatePoll";

/* eslint-disable  no-unused-vars */
const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      actionsBar={
        <button
          onClick={() => router.push("/")}
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-blue-400 p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
        >
          Return Home
        </button>
      }
    >
      <div className="container flex flex-col items-center justify-center gap-12 p-24">
        <div className="flex">
          <CreatePoll />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
