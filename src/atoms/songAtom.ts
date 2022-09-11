import { atom } from 'recoil';

export const currentTrackIdState = atom<string | undefined>({
  key: 'currentTrackIdState'
});

export const isPlayingState = atom<boolean>({
  key: 'isPlayingState',
  default: false
});
