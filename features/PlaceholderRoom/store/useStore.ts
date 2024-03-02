import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { DAYTIME, FOCUS, SONG } from "../types";

type Store = {
	isDay: boolean;
	song: SONG;
	isMusicOn: boolean;
	isHoverOver: boolean;
	previewRecord: SONG;
	focus: FOCUS;
	isReady: boolean;
	setIsDay: (isDay: boolean) => void;
	toggleDaytime: () => void;
	toggleMusicOn: () => void;
	setIsMusicOn: (isMusicOn: boolean) => void;
	setSong: (song: SONG) => void;
	setPreviewRecord: (previewRecord: SONG) => void;
	setIsHoverOver: (isHoverOver: boolean) => void;
	setFocus: (focus: FOCUS) => void;
	setIsReady: (isReady: boolean) => void;
};

const DEFAULT_PROPS = {
	isDay: true,
	isReady: false,
	song: SONG.FIRST,
	isHoverOver: false,
	isMusicOn: false,
	previewRecord: SONG.NONE,
	focus: FOCUS.CENTER,
};

const useStore = create<Store>()(
	subscribeWithSelector((set, get) => ({
		...DEFAULT_PROPS,
		setIsDay: (isDay) => set({ isDay }),
		toggleDaytime: () => {
			return set({
				isDay: !get().isDay,
			});
		},
		toggleMusicOn: () => {
			return set({
				isMusicOn: !get().isMusicOn,
			});
		},
		setSong: (song) => set({ song }),
		setPreviewRecord: (previewRecord) => set({ previewRecord }),
		setIsHoverOver: (isHoverOver) => set({ isHoverOver }),
		setIsMusicOn: (isMusicOn) => set({ isMusicOn }),
		setFocus: (focus) => set({ focus }),
		setIsReady: (isReady) => set({ isReady }),
	}))
);

export default useStore;
