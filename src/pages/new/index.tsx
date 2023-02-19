import { type NextPage } from "next";
import { MainLayout } from "@/layouts/MainLayout";
import { CreatePoll } from "@/components/CreatePoll/CreatePoll";

/* eslint-disable  no-unused-vars */
const Home: NextPage = () => {
  return (
    <MainLayout>
      <div className="container flex flex-col items-center justify-center gap-12 p-24">
        <div className="flex">
          <CreatePoll />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
