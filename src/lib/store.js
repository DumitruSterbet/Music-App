import { create } from "zustand";

export const useNavScrollTigger = create((set) => ({
  getTrigger: false,
  getIsNavScrollTrigger: (value) => set(() => ({ getTrigger: value })),
}));

export const useAppUtil = create((set) => ({
  theme: {},
  openSwitch: false,
  toggleMenu: false,
  toggleSearch: false,
  toggleGenres: false,
  searchRef: undefined,
  getTheme: (value) => set(() => ({ theme: value })),
  getOpenSwitch: (value) => set(() => ({ openSwitch: value })),
  getToggleMenu: (value) => set(() => ({ toggleMenu: value })),
  getToggleSearch: (value) => set(() => ({ toggleSearch: value })),
  getToggleGenres: (value) => set(() => ({ toggleGenres: value })),
  getSearchRef: (value) => set(() => ({ searchRef: value })),
}));

export const useAppModal = create((set) => ({
  isOpen: false,
  modalContent: null,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false, modalContent: null })),
  getModalContent: (value) => set(() => ({ modalContent: value })),
}));


export const usePlayerStore = create((set) => ({
  //tracklist: [],
  playlistId: null,
  playlistType: null,
  trackIndex: 0,
  trackId: null,
  trackType: null,
  currentPlaylistDetails: null,
  isTrackPlaying: false,
  audioLoader: null,
  isLooping: false,
  isShuffle: false,

  getTrackList: (value) => set((state) => (
    
    {
    tracklist: value.tracklist || [],
    playlistId: value.playlistId || 1,
    playlistType: value.playlistType || 'Album',
    trackIndex: value.trackIndex || 0,
    trackId: value.trackId || null,
    trackType: value.trackType || null,
  })),
  

  getPlaylist: (value) => set((state) => {
    const { tracklist, playlistId, playlistType, trackIndex, trackId, trackType } = value || {};
    console.log("seted1",value,state);
    if (tracklist?.length) {
    
      return {
        tracklist,
        playlistId: playlistId || state.playlistId,
        playlistType: playlistType || state.playlistType,
        trackIndex: trackIndex || 0,
        trackId: trackId || tracklist[trackIndex || 0]?.id,
        trackType: trackType || tracklist[trackIndex || 0]?.type,
      };
    }
  }),

  getCurrentPlaylist: (value) => set({ currentPlaylistDetails: value }),

  updateTrackIndex: (value) => set({ trackIndex: value }),

  getIsTrackPlaying: (value) => set({ isTrackPlaying: value }),

  getNextTrack: () => set((state) => {
    const isLastTrack = state.tracklist.length - 1 <= state.trackIndex;
    return isLastTrack
      ? { trackIndex: 0, trackId: state.tracklist[0]?.id }
      : { trackIndex: state.trackIndex + 1, trackId: state.tracklist[state.trackIndex + 1]?.id };
  }),

  getPrevTrack: () => set((state) => {
    if (state.trackIndex <= 0) {
      const index = state.tracklist.length - 1;
      return { trackIndex: index, trackId: state.tracklist[index]?.id };
    } else {
      return { trackIndex: state.trackIndex - 1, trackId: state.tracklist[state.trackIndex - 1]?.id };
    }
  }),

  setOnAudioEnd: () => set((state) => {
    const isLastTrack = state.tracklist.length - 1 <= state.trackIndex;
    if (state.isLooping) {
      return { trackIndex: state.trackIndex, trackId: state.tracklist[state.trackIndex]?.id };
    } else if (isLastTrack) {
      return { trackIndex: 0, trackId: state.tracklist[0]?.id };
    } else {
      return { trackIndex: state.trackIndex + 1, trackId: state.tracklist[state.trackIndex + 1]?.id };
    }
  }),

  toggleIsLooping: () => set((state) => ({ isLooping: !state.isLooping })),

  toggleIsShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
}));


export const useCurrentUser = create((set) => ({
  currentUser: null,
  userProfile: null,
  getCurrentUser: (value) => set(() => ({ currentUser: value })),
  getUserProfile: (value) => set(() => ({ userProfile: value })),
}));
