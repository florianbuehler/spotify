import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms';
import { Song } from './index';

const Songs: React.FC = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      <div className="grid grid-cols-4 px-5 text-sm text-gray-500 pb-3 border-b-[0.5px] border-gray-800">
        <div className="col-span-2 flex items-center space-x-4">
          <p>#</p>
          <p>TITLE</p>
        </div>
        <p className="hidden md:inline">ALBUM</p>
        <ClockIcon className="h-5 w-5 justify-self-end mr-1 col-span-2 md:col-span-1" />
      </div>
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track?.id} order={i} track={track} />
      ))}
    </div>
  );
};

export default Songs;
