import { atom } from 'recoil';
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '37i9dQZF1DX5trt9i14X7j'
});

export const playlistState = atom<SinglePlaylistResponse | null>({
  key: 'playlistState',
  default: null
});
