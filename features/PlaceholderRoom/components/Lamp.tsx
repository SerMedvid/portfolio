import { useRef } from "react";
import useStore from "../store/useStore";
import { MeshStandardMaterial, PointLight } from "three";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { DAYTIME_ANIMATION_DURATION } from "../constants";
import { useDaytime } from "../hooks";

type Props = {
	nodes: {
		Lamp_1: THREE.Mesh;
		Lamp_2: THREE.Mesh;
		LampEmission: THREE.Mesh;
	};
	materials: {
		White: THREE.MeshStandardMaterial;
		["Black.001"]: THREE.MeshStandardMaterial;
		["White.001"]: THREE.MeshStandardMaterial;
	};
};

export default function Lamp({ nodes, materials }: Props) {
	const pointLightRef = useRef<PointLight>(null);
	const materialRef = useRef<MeshStandardMaterial>(null);
	const isDayRef = useDaytime();

	useFrame((_, delta) => {
		if (pointLightRef.current && materialRef.current) {
			easing.damp(
				pointLightRef.current,
				"intensity",
				isDayRef.current ? 0 : 20,
				DAYTIME_ANIMATION_DURATION,
				delta
			);

			easing.damp(
				materialRef.current,
				"emissiveIntensity",
				isDayRef.current ? 0 : 20,
				DAYTIME_ANIMATION_DURATION / 2,
				delta
			);
		}
	});

	const toggleDaytime = useStore((state) => state.toggleDaytime);
	const setIsHoverOver = useStore((state) => state.setIsHoverOver);

	return (
		<group
			position={[-1.315, 1.782, -3.005]}
			rotation={[-1.571, 1.57, 1.571]}
		>
			<mesh
				geometry={nodes.Lamp_1.geometry}
				material={materials["White.001"]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes.Lamp_2.geometry}
				material={materials["Black.001"]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes.LampEmission.geometry}
				material={materials.White}
				position={[-0.001, 0.897, 0.164]}
				castShadow
				receiveShadow
				onPointerDown={toggleDaytime}
				onPointerEnter={() => setIsHoverOver(true)}
				onPointerLeave={() => setIsHoverOver(false)}
			>
				<pointLight
					ref={pointLightRef}
					intensity={0}
					color={"#fff5b6"}
					castShadow
					shadow-bias={"-0.001"}
				/>
				<meshStandardMaterial
					ref={materialRef}
					emissive={"#fff5b6"}
					emissiveIntensity={0}
				/>
			</mesh>
		</group>
	);
}
