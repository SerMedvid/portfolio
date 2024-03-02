import {
	MeshTransmissionMaterial,
	RenderTexture,
	useTexture,
} from "@react-three/drei";
import { BackSide, ShaderMaterial } from "three";
import { useDaytime } from "../hooks";

import fragmentShader from "../shaders/surroundingFragment.glsl";
import vertexShader from "../shaders/surroundingVertex.glsl";
import { useCallback, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { DAYTIME_ANIMATION_DURATION } from "../constants";

export default function Surroundings() {
	const { dayTexture, nightTexture } = useTexture({
		dayTexture: "/assets/PlaceholderRoom/night.jpg",
		nightTexture: "/assets/PlaceholderRoom/day.jpg",
	});

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

	useDaytime({ onChange });

	useFrame((_, delta) => {
		if (!backgroundShaderRef.current) return;

		easing.damp(
			backgroundShaderRef.current.uniforms.uProgress,
			"value",
			1,
			DAYTIME_ANIMATION_DURATION,
			delta
		);
	});

	return (
		<MeshTransmissionMaterial
			roughness={0.5}
			distortion={0.8}
			color={"#9daeb5"}
			anisotropicBlur={0.5}
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
