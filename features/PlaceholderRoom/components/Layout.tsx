"use client";

import { Canvas } from "@react-three/fiber";
import PlayingAudio from "./PlayingAudio";
import { Suspense } from "react";
import Loader from "./Loader";
import dynamic from "next/dynamic";
import { Preload, useGLTF, useTexture } from "@react-three/drei";
import Messages from "./Messages";
import { Perf } from "r3f-perf";

const Experience = dynamic(() => import("./Experience"));

export default function Layout() {
	return (
		<div className={"top-0 left-0 w-full h-full fixed"}>
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
