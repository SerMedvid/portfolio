import { useCallback, useRef } from "react";
import { DirectionalLight } from "three";
import { useDaytime } from "../hooks";
import { useFrame } from "@react-three/fiber";
import {
	DAYTIME_ANIMATION_DURATION,
	DAY_LIGHT,
	NIGHT_LIGHT,
} from "../constants";
import { easing } from "maath";

const DAYLIGHT_NORMAL_POSITION = [5.9, 15.5, -19.3] as [number, number, number];

const NIGHTLIGHT_NORMAL_POSITION = [5.9, 15.5, -15.6] as [
	number,
	number,
	number
];
const LIGHT_START_POSITION = [18.3, -0.3, 0.3] as [number, number, number];
const LIGHT_END_POSITION = [-18.3, -0.3, 0.3] as [number, number, number];

export default function Lights() {
	const dayLightRef = useRef<DirectionalLight>(null);
	const nightLightRef = useRef<DirectionalLight>(null);

	const onDaytimeChange = useCallback((isDay: boolean) => {
		if (!dayLightRef.current || !nightLightRef.current) {
			return;
		}

		(isDay ? dayLightRef.current : nightLightRef.current).position.fromArray(
			LIGHT_START_POSITION
		);
		(isDay ? dayLightRef.current : nightLightRef.current).intensity = 0;

		(isDay ? nightLightRef.current : dayLightRef.current).intensity = 10;

		if (isDay) {
			nightLightRef.current.position.fromArray(NIGHTLIGHT_NORMAL_POSITION);
		} else {
			dayLightRef.current.position.fromArray(DAYLIGHT_NORMAL_POSITION);
		}
	}, []);

	const isDayRef = useDaytime({ onChange: onDaytimeChange });

	useFrame((_, delta) => {
		if (!dayLightRef.current || !nightLightRef.current) {
			return;
		}

		/** move current light to end */
		easing.damp3(
			(isDayRef.current ? nightLightRef.current : dayLightRef.current).position,
			LIGHT_END_POSITION,
			DAYTIME_ANIMATION_DURATION,
			delta
		);
		easing.damp(
			isDayRef.current ? nightLightRef.current : dayLightRef.current,
			"intensity",
			0,
			DAYTIME_ANIMATION_DURATION,
			delta
		);

		/** move new light to end */
		easing.damp3(
			(isDayRef.current ? dayLightRef.current : nightLightRef.current).position,
			isDayRef.current ? DAYLIGHT_NORMAL_POSITION : NIGHTLIGHT_NORMAL_POSITION,
			DAYTIME_ANIMATION_DURATION,
			delta
		);
		easing.damp(
			isDayRef.current ? dayLightRef.current : nightLightRef.current,
			"intensity",
			10,
			DAYTIME_ANIMATION_DURATION,
			delta
		);
	});

	return (
		<>
			<ambientLight intensity={0.8} />

			<directionalLight
				ref={nightLightRef}
				position={LIGHT_START_POSITION}
				scale={2}
				castShadow
				intensity={10}
				color={NIGHT_LIGHT}
				shadow-bias={-0.001}
			/>

			<directionalLight
				ref={dayLightRef}
				position={DAYLIGHT_NORMAL_POSITION}
				scale={4}
				castShadow
				intensity={8}
				color={DAY_LIGHT}
				shadow-bias={-0.001}
			/>
		</>
	);
}
