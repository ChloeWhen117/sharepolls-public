import { type NextPage } from "next";
import { MainLayout } from "@/layouts/MainLayout";
import React from "react";
import { Alert } from "@/components/common/Alert/Alert";
import Link from "next/link";

const starterOneVotes = new Array(3000).fill(0);
const starterTwoVotes = new Array(1500).fill(0);
const starterThreeVotes = new Array(250).fill(0);
const starterFourVotes = new Array(250).fill(0);

const samplePoll = {
  title: "Sample Pokemon Poll",
  question: "Which starter Pokemon did you pick in Pokemon Generation One?",
  options: [
    {
      id: "0",
      body: "Pikachu",
      PollVote: starterOneVotes,
    },
    {
      id: "1",
      body: "Charmander",
      PollVote: starterTwoVotes,
    },
    {
      id: "2",
      body: "Bulbasaur",
      PollVote: starterThreeVotes,
    },
    {
      id: "3",
      body: "Squirtle",
      PollVote: starterFourVotes,
    },
  ],
};

const SamplePoll = () => {
  const totalVotes = 5000;
  const submitLabel = "Submit Vote";

  return (
    <div className="flex w-full flex-col justify-center text-center">
      <div className="p-4 text-center text-xl font-bold text-white">
        <span>{samplePoll?.title}</span>
      </div>
      <div className="flex h-fit w-full justify-center">
        <div className="flex w-full max-w-2xl flex-col rounded-md border-2 border-white bg-slate-200/10 p-4">
          <p className="flex w-fit break-words rounded-md text-xl font-bold text-white">
            {`"${samplePoll?.question}"`}
          </p>
          <p className="max-w-ws text mx-auto flex font-bold text-white">
            Vote for one
          </p>
          <form className="flex flex-col text-sm">
            {samplePoll?.options.map((option, idx) => {
              const optionsVoteCount = option.PollVote.length;
              const votePercentage = totalVotes
                ? Math.floor((optionsVoteCount / totalVotes) * 100)
                : 0;
              return (
                <div
                  className="flex flex-col px-4 text-white"
                  key={`option_${option.id}`}
                >
                  <div className="flex gap-2 py-2">
                    <input
                      type="radio"
                      id={`option${idx}`}
                      value={option?.id}
                      disabled
                    />
                    <label className="flex break-all" htmlFor={`option${idx}`}>
                      {option?.body}
                    </label>
                  </div>
                  {
                    <p className="bg-gradient-to-b from-purple-700 to-[#15162c] px-4">
                      {votePercentage}% of users voted for this option
                    </p>
                  }
                </div>
              );
            })}
            <div className="flex flex-col items-center justify-center gap-2 px-2 py-4 text-white">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                disabled
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

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
      <div className="flex h-full w-full justify-center">
        <div className="flex h-full max-w-5xl flex-col gap-4">
          <div className="p-4 text-6xl text-white">
            <span> App for sharing polls!</span>
          </div>
          <div className="grid grid-rows-2 gap-2 p-4 md:grid-cols-2 md:grid-rows-1">
            <div className="flex flex-col rounded-xl border-2 border-white p-4 text-2xl text-white">
              <div>
                <span> Create Polls like the one below!</span>
                <br />
                <span className="text-sm">
                  Disclaimer: Poll is currently disabled and acts only as a
                  visual demo.
                </span>
              </div>
              <SamplePoll />
            </div>
            <div className="flex flex-col rounded-xl border-2 border-white p-4 text-2xl text-white">
              <div>
                <span> Review Data!</span>
              </div>
              <div className="text-center">Feature is a work in progress.</div>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <Link href={"/new"}>
              <button className="rounded-full bg-white/10 px-10 py-4 font-semibold text-white no-underline transition hover:bg-white/20">
                Get Started Here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
