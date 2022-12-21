import React from "react";
import Link from "next/link";

interface Props {
  actionsBar: JSX.Element;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ actionsBar, children }) => {
  return (
    <>
      <header className="mx-auto flex max-w-6xl flex-row justify-between px-20 pt-4">
        <h1 className="p-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Share Polls
        </h1>
        <div className="flex items-end p-4">{actionsBar}</div>
      </header>
      <main className="mx-auto my-4 flex h-screen max-w-6xl rounded-xl bg-indigo-500">
        {children}
      </main>
      <footer
        id="linksFooter"
        className="max-w-ws item-center sticky top-[100vh] flex justify-center gap-4 bg-[#15162c] p-2 text-center text-xl"
      >
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
