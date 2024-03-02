import { CameraControls } from "@react-three/drei";
import { FOCUS, SONG } from "../types";

export const SONGS_MAP = new Map([
	[
		SONG.FIRST,
		{
			name: "Danny Shields - Sunny Daydreams",
			track:
				"/assets/PlaceholderRoom/music/Danny Shields - Sunny Daydreams.mp3",
		},
	],
	[
		SONG.SECOND,
		{
			name: "SOURWAH - From the Forest",
			track: "/assets/PlaceholderRoom/music/SOURWAH - From the Forest.mp3",
		},
	],
	[
		SONG.THIRD,
		{
			name: "Novembers - Low",
			track: "/assets/PlaceholderRoom/music/Novembers - Low.mp3",
		},
	],
	[
		SONG.FORTH,
		{
			name: "WEARETHEGOOD - Live in the Moment",
			track:
				"/assets/PlaceholderRoom/music/WEARETHEGOOD - Live in the Moment.mp3",
		},
	],
	[
		SONG.FIFTH,
		{
			name: "RocknStock - Hot Rod",
			track: "/assets/PlaceholderRoom/music/RocknStock - Hot Rod.mp3",
		},
	],
]);

export const FOCUS_MAP = new Map<
	FOCUS,
	Parameters<CameraControls["setLookAt"]>
>([
	[FOCUS.CENTER, [8.8, 3.3, 9, 0, 0, 0, true]],
	[FOCUS.RECORDS, [0.68, 0.09, 4, 2, -0.85, 0, true]],
	[FOCUS.CONTACT, [1.29, 0.68, -2.73, 0.3, -2.85, -4.64, true]],
	[FOCUS.PHOTO, [-1.59, 2.28, -0.98, -3.5, 1.5, -1.86, true]],
	[FOCUS.MONITOR, [0, 0.1, -0.9, 0, 0, -2.69, true]],
]);
