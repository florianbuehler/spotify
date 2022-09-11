import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms';
import { useSpotifyApi } from '../hooks';
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

const Playlist: React.FC = () => {
  const spotifyApi = useSpotifyApi();

  const [color, setColor] = useState<string | null>(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(_.shuffle(colors).pop()!);
  }, [playlistId]);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const data = await spotifyApi.getPlaylist(playlistId);

        setPlaylist(data.body);
      } catch (error) {
        console.error('Something went wrong fetching the playlist - error:', error);
      }
    };

    if (spotifyApi.getAccessToken()) {
      void getPlaylist();
    }
  }, [spotifyApi, playlistId, setPlaylist]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt="playlist cover"
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p className="uppercase text-gray-500">Playlist</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>

      <Songs />
    </div>
  );
};

export default Playlist;
