import {
	MeshTransmissionMaterial,
	RenderTexture,
	useTexture,
} from "@react-three/drei";
import { BackSide, Color, ShaderMaterial } from "three";
import { useDaytime } from "../hooks";

import fragmentShader from "../shaders/surroundingFragment.glsl";
import vertexShader from "../shaders/surroundingVertex.glsl";
import { ElementRef, useCallback, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { DAYTIME_ANIMATION_DURATION } from "../constants";

const DAY_GLASS = new Color("#bdd2db");

const NIGHT_GLASS = new Color("#667278");

export default function Surroundings() {
	const { dayTexture, nightTexture } = useTexture({
		dayTexture: "/assets/PlaceholderRoom/night.jpg",
		nightTexture: "/assets/PlaceholderRoom/day.jpg",
	});
	const glassRef = useRef<ElementRef<typeof MeshTransmissionMaterial>>(null);

	const backgroundShaderRef = useRef<ShaderMaterial>(null);

	const onChange = useCallback(
		(isDay: boolean) => {
			if (!backgroundShaderRef.current) return;

			backgroundShaderRef.current.uniforms.uTextureStart.value = isDay
				? nightTexture
				: dayTexture;
			backgroundShaderRef.current.uniforms.uTextureEnd.value = isDay
				? dayTexture
				: nightTexture;
			backgroundShaderRef.current.uniforms.uProgress.value = 0;
		},
		[dayTexture, nightTexture]
	);

	const isDayRef = useDaytime({ onChange });

	useFrame((_, delta) => {
		if (!backgroundShaderRef.current) return;

		easing.damp(
			backgroundShaderRef.current.uniforms.uProgress,
			"value",
			1,
			DAYTIME_ANIMATION_DURATION,
			delta
		);

		if (!glassRef.current) return;

		const startColor =
			glassRef.current.color instanceof Color
				? glassRef.current.color
				: DAY_GLASS;

		easing.dampC(
			startColor,
			isDayRef.current ? DAY_GLASS : NIGHT_GLASS,
			DAYTIME_ANIMATION_DURATION,
			delta
		);
	});

	return (
		<MeshTransmissionMaterial
			ref={glassRef}
			ior={1.4}
			thickness={1}
			anisotropy={0.1}
			chromaticAberration={0.04}
			distortion={0}
			transmission={1}
			anisotropicBlur={0}
			attach={"material"}
		>
			<RenderTexture attach={"buffer"}>
				<mesh>
					<sphereGeometry args={[10, 32, 32]} />
					<shaderMaterial
						ref={backgroundShaderRef}
						key={Date.now()}
						side={BackSide}
						vertexShader={vertexShader}
						fragmentShader={fragmentShader}
						toneMapped={false}
						uniforms={{
							uTextureStart: {
								value: nightTexture,
							},
							uTextureEnd: {
								value: dayTexture,
							},
							uProgress: {
								value: 1,
							},
						}}
					/>
				</mesh>
			</RenderTexture>
		</MeshTransmissionMaterial>
	);
}
