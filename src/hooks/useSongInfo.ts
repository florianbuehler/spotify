import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms';
import { useSpotifyApi } from './index';
import SingleTrackResponse = SpotifyApi.SingleTrackResponse;

const useSongInfo = () => {
  const spotifyApi = useSpotifyApi();

  const [currentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<SingleTrackResponse | null>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await spotifyApi.getTrack(currentTrackId);

        setSongInfo(trackInfo.body);
      }
    };

    void fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
