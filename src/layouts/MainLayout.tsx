import React from "react";
import { NavBar } from "@/components/NavBar/NavBar";

interface Props {
  alerts?: JSX.Element;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ alerts, children }) => {
  return (
    <>
      <div className="flex min-h-screen w-screen justify-center">
        <div id="content-wrapper" className="flex flex-col">
          <div className="flex flex-row  pt-4">
            <div className="flex w-full max-w-5xl flex-col md:flex-row">
              <h1 className="p-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Share Polls
              </h1>
              <NavBar />
            </div>
          </div>
          <main className="flex min-h-[800px] ">
            <div className="my-4 flex min-h-[800px] w-full max-w-5xl flex-col bg-indigo-700">
              {alerts && <div className="flex px-4 py-8">{alerts}</div>}
              {children}
            </div>
          </main>
        </div>
      </div>
      <footer className="min-h-20 flex w-screen justify-center bg-slate-400">
        <div
          id="wrap"
          className="flex w-full max-w-5xl flex-col items-center p-4 sm:flex-row"
        >
          <div className="flex w-full">
            <h3>© 2023 Copyright Chloe Nguyen. All rights reserved</h3>
          </div>
        </div>
      </footer>
    </>
  );
};
