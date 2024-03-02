import { Html, useProgress } from "@react-three/drei";
import { useDebounceEffect } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../store/useStore";

export default function Loader() {
	const { progress } = useProgress();
	const prevProgress = useRef(0);
	const [canShow, setCanShow] = useState(true);
	const [animateOut, setAnimateOut] = useState(false);
	const isReady = useStore((state) => state.isReady);

	useEffect(() => {
		prevProgress.current = Math.floor(Math.max(prevProgress.current, progress));
	}, [progress]);

	useDebounceEffect(
		() => {
			if (isReady) {
				setAnimateOut(true);

				setTimeout(() => {
					setCanShow(false);
				}, 500);
			}
		},
		[isReady],
		{ wait: 100 }
	);

	if (!canShow) return null;

	return (
		<Html center>
			<div
				className={`bg-neutral-950 w-[100vw] h-[100svh] flex duration-500 flex-col px-4 py-4 ${
					animateOut ? "translate-y-full" : "translate-y-0"
				}`}
			>
				<h1 className="text-white text-8xl md:text-9xl leading-none max-w-[70vw] md:max-w-lg ">
					Just look who came
				</h1>
				<div className="self-end items-end flex-auto flex">
					<h4 className="text-white text-9xl ">{prevProgress.current}%</h4>
				</div>
			</div>
		</Html>
	);
}
