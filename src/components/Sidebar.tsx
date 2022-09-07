import React, { useEffect, useState } from 'react';
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms';
import { useSpotifyApi } from '../hooks';
import { Logo, SidebarButton } from './index';
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
    <nav className="text-gray-500 p-5 text-xs lg:text-sm border-r-[0.5px] border-gray-800 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex mb-36">
      <div className="space-y-4">
        <div className="flex items-center justify-center mt-6 mb-10">
          <Logo className="h-16 w-16 text-gray-500" />
          <div>
            <h1 className="text-gray-500 text-lg ml-4 font-bold">Spotify</h1>
            <h1 className="text-gray-500 text-lg ml-10 mt-[-0.5rem] font-bold">Remote</h1>
          </div>
        </div>
        <SidebarButton>
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </SidebarButton>
        <SidebarButton>
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span>Search</span>
        </SidebarButton>
        <SidebarButton>
          <BuildingLibraryIcon className="h-5 w-5" />
          <span>Your Library</span>
        </SidebarButton>
        <hr className="border-t-[0.5px] border-gray-800" />
        <SidebarButton>
          <PlusCircleIcon className="h-5 w-5" />
          <span>Create Playlist</span>
        </SidebarButton>
        <SidebarButton>
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <span>Liked Songs</span>
        </SidebarButton>
        <SidebarButton>
          <RssIcon className="h-5 w-5 text-green-500" />
          <span>Your Episodes</span>
        </SidebarButton>
        <hr className="border-t-[0.5px] border-gray-800" />

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
