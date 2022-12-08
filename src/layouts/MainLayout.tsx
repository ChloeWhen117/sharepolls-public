import React from 'react';
import Link from "next/link";

type Props = {
  actionsBar?: JSX.Element;
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({
  actionsBar,
  children
}) => {
  return (
    <>
        <main className="flex flex-col min-h-screen mx-auto p-20 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex flex-row justify-between">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] p-4">
                Share Polls
            </h1>
            <div className="flex items-center">
                {actionsBar}
            </div>
        </div>
            {children}

        </main>
        <footer id="linksFooter" className="max-w-ws flex text-xl text-center item-center justify-center p-2 gap-4 bg-[#15162c]">
            <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/https://github.com/ChloeWhen117/sharecattv"
            >
            <div>Github</div>
            </Link>
            <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/results"
            >
            <div>Results</div>
            </Link>
            <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/about"
            >
            <div>About</div>
            </Link>
        </footer>
  </>
  );
};