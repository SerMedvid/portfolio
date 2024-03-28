import { useEffect, useRef } from "react";
import { Group } from "three";
import useStore from "../store/useStore";
import { FOCUS } from "../types";
import gsap from "gsap";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Chair_1: THREE.Mesh;
		Chair_2: THREE.Mesh;
		ChairStand: THREE.Mesh;
	};
	materials: {
		Steel: THREE.MeshStandardMaterial;
		Sofa: THREE.MeshStandardMaterial;
	};
};

export default function Chair({ nodes, materials, ...rest }: Props) {
	const topRef = useRef<Group>(null);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.focus,
			(focus) => {
				if (topRef.current) {
					gsap.to(topRef.current.rotation, {
						y: focus === FOCUS.MONITOR ? -Math.PI * 0.4 : 0,
						duration: 0.8,
					});
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<group {...rest}>
			<group ref={topRef}>
				<mesh
					geometry={nodes.Chair_1.geometry}
					material={materials.Sofa}
				/>
				<mesh
					geometry={nodes.Chair_2.geometry}
					material={materials.Steel}
				/>
			</group>

			<mesh
				geometry={nodes.ChairStand.geometry}
				material={materials.Steel}
			/>
		</group>
	);
}
