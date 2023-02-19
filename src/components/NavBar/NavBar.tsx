import React from "react";
import Link from "next/link";

export const NavBar: React.FC = () => {
  return (
    <ul
      id="nav"
      className="grid grid-cols-1 grid-rows-4 items-end p-4 text-center text-white sm:grid-cols-4 sm:grid-rows-1 md:items-center"
    >
      <li id="nav-item">
        <Link href={`/`}>
          <span>Home</span>
        </Link>
      </li>
      <li id="nav-item">
        <Link href={`/polls`}>
          <span>All Polls</span>
        </Link>
      </li>
      <li id="nav-item">
        <Link href={`/profile`}>
          <span>My Polls</span>
        </Link>
      </li>
      <li id="nav-item">
        <Link href={`/new`}>
          <span>Start A Poll</span>
        </Link>
      </li>
    </ul>
  );
};
