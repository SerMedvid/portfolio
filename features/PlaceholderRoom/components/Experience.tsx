"use client";

import { SoftShadows, Center } from "@react-three/drei";
import { LivingRoomModel } from "./LivingRoomModel";
import CameraSetup from "./CameraSetup";
import Lights from "./Lights";
import Pointer from "./Pointer";
import Background from "./Background";

export default function Experience() {
	return (
		<>
			<Center>
				<LivingRoomModel />
			</Center>

			<SoftShadows />

			<Lights />
			<CameraSetup />

			<Pointer />

			<Background />
		</>
	);
}
