import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";
import { easing } from "maath";
import {
	DAYTIME_ANIMATION_DURATION,
	DAY_LIGHT,
	NIGHT_LIGHT,
} from "../constants";
import { useDaytime } from "../hooks";

export default function Background() {
	const colorRef = useRef<Color>(null);
	const isDayRef = useDaytime();

	useFrame((_, delta) => {
		if (colorRef.current) {
			easing.dampC(
				colorRef.current,
				isDayRef.current ? DAY_LIGHT : NIGHT_LIGHT,
				DAYTIME_ANIMATION_DURATION,
				delta
			);
		}
	});

	return (
		<color
			ref={colorRef}
			args={[DAY_LIGHT]}
			attach={"background"}
		/>
	);
}
