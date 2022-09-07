import React, { useCallback, useEffect, useState } from 'react';
import { SpeakerWaveIcon as VolumeDownIcon } from '@heroicons/react/24/outline';
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon as VolumeUpIcon
} from '@heroicons/react/24/solid';
import { debounce } from 'lodash';
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAdjustVolume = useCallback(
    debounce(async (volume) => {
      try {
        await spotifyApi.setVolume(volume);
      } catch (error) {
        console.error('Something went wrong setting the volume - error:', error);
      }
    }, 250),
    [spotifyApi]
  );

  useEffect(() => {
    debouncedAdjustVolume(volume);
  }, [debouncedAdjustVolume, volume]);

  const handlePlayPause = async () => {
    const currentPlaybackStateResponse = await spotifyApi.getMyCurrentPlaybackState();
    const isPlaying = currentPlaybackStateResponse.body.is_playing;

    if (isPlaying) {
      await spotifyApi.pause();
      setIsPlaying(false);
    } else {
      await spotifyApi.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="sticky bottom-0">
      <div className="grid grid-cols-3 text-xs md:text-base h-24 bg-gradient-to-b from-black to-gray-900 text-white px-2 md:px-8">
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-12 w-12"
            src={songInfo?.album.images?.[0]?.url}
            alt="cover"
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p className="text-xs text-gray-500">
              {songInfo?.artists?.map((artist) => artist.name).join(', ')}
            </p>
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

        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeDownIcon
            className="player-button"
            onClick={() => volume > 0 && setVolume((prevVol) => Math.max(prevVol - 10, 0))}
          />
          <input
            className="w-14 md:w-28 cursor-pointer"
            type="range"
            value={volume}
            min={0}
            max={100}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <VolumeUpIcon
            className="player-button"
            onClick={() => volume < 100 && setVolume((prevVol) => Math.min(prevVol + 10, 100))}
          />
        </div>
      </div>
    </section>
  );
};

export default Player;
