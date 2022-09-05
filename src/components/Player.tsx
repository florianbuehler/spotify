import React, { useEffect, useState } from 'react';
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms';
import { useSongInfo, useSpotifyApi } from '../hooks';

const Player: React.FC = () => {
  const spotifyApi = useSpotifyApi();
  const { data: session, status } = useSession();
  const songInfo = useSongInfo();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      const currentPlayingTrackRes = await spotifyApi.getMyCurrentPlayingTrack();
      const currentPlayingTrackBody = await currentPlayingTrackRes.body;

      const currentPlaybackStateRes = await spotifyApi.getMyCurrentPlaybackState();
      const currentPlaybackStateBody = await currentPlaybackStateRes.body;

      setCurrentTrackId(currentPlayingTrackBody.item?.id);
      setIsPlaying(currentPlaybackStateBody.is_playing);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      void fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const handlePlayPause = () => {}

  return (
    <section className="sticky bottom-0">
      <div className="grid grid-cols-3 text-xs md:text-base h-24 bg-gradient-to-b from-black to-gray-900 text-white px-2 md:px-8">
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album.images?.[0]?.url}
            alt="cover"
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-evenly">
          <ArrowsRightLeftIcon className="player-button" />
          <BackwardIcon className="player-button" onClick={() => spotifyApi.skipToPrevious()} />
          {isPlaying ? (
            <PauseIcon className="player-button h-10 w-10" onClick={handlePlayPause} />
          ) : (
            <PlayIcon className="player-button h-10 w-10" onClick={handlePlayPause} />
          )}
          <ForwardIcon className="player-button" onClick={() => spotifyApi.skipToNext()} />
          <ArrowUturnLeftIcon className="player-button" />
        </div>
      </div>
    </section>
  );
};

export default Player;
