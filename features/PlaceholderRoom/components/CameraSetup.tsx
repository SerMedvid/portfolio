"use client";

import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { useDebounceEffect } from "ahooks";
import { ElementRef, useEffect, useRef } from "react";
import useStore from "../store/useStore";
import { FOCUS_MAP } from "../data";
import { FOCUS, KEYSCONTROL } from "../types";

export default function CameraSetup() {
	const cameraControlsRef = useRef<ElementRef<typeof CameraControls>>(null);
	const isFirstRun = useRef(true);
	const focus = useStore((state) => state.focus);
	const setFocus = useStore((state) => state.setFocus);
	const isReady = useStore((state) => state.isReady);
	const isCenter = focus === FOCUS.CENTER;

	const [sub] = useKeyboardControls<KEYSCONTROL>();

	useEffect(() => {
		return sub(
			(state) => Object.entries(state).find((pair) => !!pair[1])?.[0],
			(pressed) => {
				if (pressed) {
					setFocus(+pressed as unknown as FOCUS);
				}
			}
		);
	}, [setFocus, sub]);

	useEffect(() => {
		const handleFocus = async () => {
			if (!cameraControlsRef.current || isFirstRun.current) return;

			const focusPoint = FOCUS_MAP.get(focus);

			if (!focusPoint) {
				await cameraControlsRef.current.setLookAt(
					...FOCUS_MAP.get(FOCUS.CENTER)!
				);

				return;
			}

			await cameraControlsRef.current?.setLookAt(...focusPoint);
		};

		handleFocus();
	}, [focus]);

	useDebounceEffect(
		() => {
			if (cameraControlsRef.current && isReady) {
				isFirstRun.current = false;
				cameraControlsRef.current.setLookAt(...FOCUS_MAP.get(FOCUS.CENTER)!);
			}
		},
		[isReady],
		{ wait: 200 }
	);

	return (
		<>
			<CameraControls
				enabled
				ref={cameraControlsRef}
				smoothTime={0.5}
				touches={{
					one: isCenter ? 32 : 0,
					two: 0,
					three: 0,
				}}
				mouseButtons={{
					left: isCenter ? 1 : 0,
					wheel: 0,
					middle: 0,
					right: 0,
				}}
				maxAzimuthAngle={Math.PI / 2}
				minAzimuthAngle={0}
				maxPolarAngle={Math.PI / 2}
			/>
		</>
	);
}
