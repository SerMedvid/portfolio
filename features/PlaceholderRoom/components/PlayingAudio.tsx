import { ElementRef, useEffect, useRef, useState } from "react";
import useStore from "../store/useStore";
import { useDebounceEffect } from "ahooks";
import { SONGS_MAP } from "../data";

export default function PlayingAudio() {
	const playingSongId = useStore((state) => state.song);
	const setIsMusicOn = useStore((state) => state.setIsMusicOn);
	const isMusicOn = useStore((state) => state.isMusicOn);
	const audioRef = useRef<ElementRef<"audio">>(null);
	const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
	const [canPlay, setCanPlay] = useState(false);

	const onEnd = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}

		setIsMusicOn(false);
	};

	useEffect(() => {
		if (!isMusicOn) {
			setCanPlay(false);
		}
	}, [isMusicOn]);

	useDebounceEffect(
		() => {
			const track = SONGS_MAP.get(playingSongId)?.track;
			setAudioSrc(track);

			setCanPlay(!!track && isMusicOn);
		},
		[playingSongId, isMusicOn],
		{ wait: 500 }
	);

	if (!canPlay) {
		return null;
	}

	return (
		<audio
			playsInline
			autoPlay
			ref={audioRef}
			onEnded={onEnd}
			src={audioSrc}
		/>
	);
}
