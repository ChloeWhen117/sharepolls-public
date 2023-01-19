import React from "react";

interface Props {
  actionsBar: JSX.Element;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ actionsBar, children }) => {
  return (
    <>
      <header className="flex flex-row justify-center pt-4">
        <div className="flex w-full max-w-5xl justify-between">
          <h1 className="p-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Share Polls
          </h1>
        </div>
      </header>
      <main className="flex min-h-[95vh] justify-center">
        <div className="my-4 flex min-h-[800px] w-full max-w-5xl flex-col bg-indigo-500">
          <div className="flex flex w-full max-w-5xl justify-end">
            <div className="flex p-4">{actionsBar}</div>
          </div>
          {children}
        </div>
      </main>
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
