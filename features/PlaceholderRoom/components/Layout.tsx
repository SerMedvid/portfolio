"use client";

import { Canvas } from "@react-three/fiber";
import PlayingAudio from "./PlayingAudio";
import { Suspense, useMemo } from "react";
import Loader from "./Loader";
import dynamic from "next/dynamic";
import {
	KeyboardControls,
	KeyboardControlsEntry,
	Preload,
	useGLTF,
	useTexture,
} from "@react-three/drei";
import Messages from "./Messages";
import { KEYSCONTROL } from "../types";

const Experience = dynamic(() => import("./Experience"));

export default function Layout() {
	const map = useMemo<KeyboardControlsEntry<KEYSCONTROL>[]>(
		() => [
			{ name: KEYSCONTROL.CENTER, keys: ["Escape", "Space"] },
			{ name: KEYSCONTROL.RECORDS, keys: ["Numpad1", "Digit1"] },
			{ name: KEYSCONTROL.CONTACT, keys: ["Numpad2", "Digit2"] },
			{ name: KEYSCONTROL.PHOTO, keys: ["Numpad3", "Digit3"] },
			{ name: KEYSCONTROL.MONITOR, keys: ["Numpad4", "Digit4"] },
		],
		[]
	);

	return (
		<div className={"top-0 left-0 w-full h-full fixed"}>
			<KeyboardControls map={map}>
				<Canvas
					shadows
					camera={{
						fov: 45,
						position: [8.7, 5.5, -18.3],
					}}
				>
					<Suspense>
						<Experience />
					</Suspense>
					<Loader />
					<Preload all />
				</Canvas>
			</KeyboardControls>

			<Messages />
			<PlayingAudio />
		</div>
	);
}

useGLTF.preload("/assets/PlaceholderRoom/living_room_threejs.glb");
useTexture.preload("/assets/PlaceholderRoom/night.jpg");
useTexture.preload("/assets/PlaceholderRoom/day.jpg");
useTexture.preload("/assets/PlaceholderRoom/frames/frame2.jpg");
useTexture.preload("/assets/PlaceholderRoom/frames/frame3.jpg");
useTexture.preload("/assets/PlaceholderRoom/frames/19.jpg");
