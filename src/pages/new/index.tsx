import { type NextPage } from "next";
import { useRouter } from 'next/router';
import { MainLayout } from "../../layouts/MainLayout"
import { CreatePoll } from "../../components/CreatePoll/CreatePoll"

/* eslint-disable  no-unused-vars */ 
const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout 
      actionsBar={
          <button
            onClick={() => router.push('/')}
            type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
          >
            Return Home
          </button>
        }
    >
        <div className="container flex flex-col items-center justify-center gap-12 p-24">
          <div className="flex" >
            <CreatePoll />
          </div>
        </div>
    </MainLayout>
  );
};

export default Home;