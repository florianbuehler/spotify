import React, { useEffect, useState } from 'react';
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms';
import { useSpotifyApi } from '../hooks';
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

const Sidebar: React.FC = () => {
  const spotifyApi = useSpotifyApi();
  const { data: session } = useSession();

  const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([]);
  const [, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    const getUserPlaylists = async () => {
      const data = await spotifyApi.getUserPlaylists();

      setPlaylists(data.body.items);
    };

    if (spotifyApi.getAccessToken()) {
      void getUserPlaylists();
    }
  }, [session, spotifyApi]);

  return (
    <nav className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
          <span>Logout</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span>Search</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <span>Your Library</span>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <span>Create Playlist</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <span>Liked Songs</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <span>Your Episodes</span>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
