import React from 'react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="absolute top-5 right-8">
      <div
        className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
        onClick={() => signOut()}
      >
        {session?.user?.image ? (
          <img className="rounded-full w-10 h-10" src={session?.user?.image} alt="user profile" />
        ) : (
          <UserIcon className="rounded-full w-10 h-10 py-2" />
        )}
        <h2>{session?.user?.name}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </header>
  );
};

export default Header;
