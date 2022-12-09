import React from 'react';
import Link from "next/link";

type Props = {
  actionsBar: JSX.Element;
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({
  actionsBar,
  children
}) => {
  return (
    <>
        <header className="flex flex-row justify-between mx-auto p-20">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] p-4">
                Share Polls
            </h1>
            <div className="flex items-end p-4">
                {actionsBar}
            </div>
        </header>
        <main className="flex h-auto">
            {children}
        </main>
        <footer id="linksFooter" className="max-w-ws sticky top-[100vh] flex text-xl text-center item-center justify-center p-2 gap-4 bg-[#15162c]">
            <Link 
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://github.com/ChloeWhen117/sharepolls-public"
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