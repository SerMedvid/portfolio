import { Mesh, MeshStandardMaterial, ShaderMaterial } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Frame: Mesh;
		FrameDisplay: Mesh;
	};
	materials: {
		White: MeshStandardMaterial;
	};
};

import fragmentShader from "../shaders/frameFragment.glsl";
import vertexShader from "../shaders/frameVertex.glsl";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { useFocus } from "../hooks";
import { FOCUS } from "../types";

export default function PhotoFrame({ materials, nodes, ...rest }: Props) {
	const textures = useTexture([
		"/assets/PlaceholderRoom/frames/frame1.jpg",
		"/assets/PlaceholderRoom/frames/frame2.jpg",
		"/assets/PlaceholderRoom/frames/frame3.jpg",
		"/assets/PlaceholderRoom/frames/19.jpg",
	]);
	const timeline = useRef<gsap.core.Timeline>();

	const materialRef = useRef<ShaderMaterial>(null);

	const { handleFocus, onPointerEnder, onPointerLeave } = useFocus({
		focusArea: FOCUS.PHOTO,
	});

	useEffect(() => {
		if (materialRef.current) {
			timeline.current = gsap
				.timeline()
				.to(
					materialRef.current.uniforms.uProgress,
					{
						value: 1,
						duration: 2,
					},
					"+=10"
				)
				.set(materialRef.current.uniforms.uProgress, {
					value: 0,
				})
				.set(materialRef.current.uniforms.uTextureStart, {
					value: textures[1],
				})
				.set(materialRef.current.uniforms.uTextureEnd, {
					value: textures[2],
				})
				.to(
					materialRef.current.uniforms.uProgress,
					{
						value: 1,
						duration: 2,
					},
					"+=10"
				)
				.set(materialRef.current.uniforms.uProgress, {
					value: 0,
				})
				.set(materialRef.current.uniforms.uTextureStart, {
					value: textures[2],
				})
				.set(materialRef.current.uniforms.uTextureEnd, {
					value: textures[0],
				})
				.to(
					materialRef.current.uniforms.uProgress,
					{
						value: 1,
						duration: 2,
					},
					"+=10"
				)
				.set(materialRef.current.uniforms.uProgress, {
					value: 0,
				})
				.set(materialRef.current.uniforms.uTextureStart, {
					value: textures[0],
				})
				.set(materialRef.current.uniforms.uTextureEnd, {
					value: textures[1],
				})
				.repeat(-1);
		}

		return () => {
			timeline.current?.kill();
		};
	}, [textures]);

	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Frame.geometry}
				material={materials.White}
				castShadow
				receiveShadow
			>
				<mesh
					geometry={nodes.FrameDisplay.geometry}
					receiveShadow
					onPointerEnter={onPointerEnder}
					onPointerLeave={onPointerLeave}
					onPointerDown={handleFocus}
				>
					<shaderMaterial
						ref={materialRef}
						fragmentShader={fragmentShader}
						vertexShader={vertexShader}
						uniforms={{
							uProgress: {
								value: 0,
							},
							uTextureStart: {
								value: textures[0],
							},
							uTextureEnd: {
								value: textures[1],
							},
							uDisplacementTexture: {
								value: textures[3],
							},
							uDisplacementFactor: {
								value: 0.5,
							},
						}}
					/>
				</mesh>
			</mesh>
		</group>
	);
}
