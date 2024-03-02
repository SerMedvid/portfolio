import { Group, Mesh, MeshStandardMaterial } from "three";
import useStore from "../store/useStore";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Player_1: Mesh;
		Player_2: Mesh;
		PlayerKnobPower: Mesh;
		PlayerKnobVolume: Mesh;
		PlayerNeedle: Mesh;
		Record_1: Mesh;
		Record_2: Mesh;
	};
	materials: {
		Wood: MeshStandardMaterial;
		Steel: MeshStandardMaterial;
		Black: MeshStandardMaterial;
		White: MeshStandardMaterial;
	};
};

export default function Player({ nodes, materials, ...rest }: Props) {
	const isMusicOnRef = useRef(false);
	const needleRef = useRef<Mesh>(null);
	const recordRef = useRef<Group>(null);

	const toggleMusicOn = useStore((state) => state.toggleMusicOn);
	const setIsHoverOver = useStore((state) => state.setIsHoverOver);

	const onPointerDown = () => {
		toggleMusicOn();
	};

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isMusicOn,
			(val) => {
				isMusicOnRef.current = val;
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	useFrame((_, delta) => {
		if (!needleRef.current || !recordRef.current) return;

		easing.damp(
			needleRef.current.rotation,
			"y",
			isMusicOnRef.current ? -Math.PI / 6 : 0,
			0.5,
			delta
		);

		if (isMusicOnRef.current && recordRef.current) {
			recordRef.current.rotation.y += delta * 0.2;
		}
	});

	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Player_1.geometry}
				material={materials.Wood}
				receiveShadow
				castShadow
			/>
			<mesh
				geometry={nodes.Player_2.geometry}
				material={materials.Steel}
				receiveShadow
				castShadow
			/>
			<mesh
				geometry={nodes.PlayerKnobPower.geometry}
				material={materials.Black}
				position={[-0.32, 0.164, 0.477]}
				receiveShadow
				castShadow
			/>
			<mesh
				geometry={nodes.PlayerKnobVolume.geometry}
				material={materials.Black}
				position={[-0.32, 0.164, 0.559]}
				receiveShadow
				castShadow
			/>
			<mesh
				ref={needleRef}
				geometry={nodes.PlayerNeedle.geometry}
				material={materials.Steel}
				position={[0.224, 0.189, 0.484]}
				receiveShadow
				onPointerDown={onPointerDown}
				onPointerEnter={() => setIsHoverOver(true)}
				onPointerLeave={() => setIsHoverOver(false)}
			/>
			<group
				ref={recordRef}
				position={[0, 0.19, 0]}
			>
				<mesh
					geometry={nodes.Record_1.geometry}
					material={materials.Black}
					receiveShadow
					castShadow
					onPointerDown={onPointerDown}
					onPointerEnter={() => setIsHoverOver(true)}
					onPointerLeave={() => setIsHoverOver(false)}
				/>
				<mesh
					geometry={nodes.Record_2.geometry}
					material={materials.White}
					receiveShadow
				/>
			</group>
		</group>
	);
}
