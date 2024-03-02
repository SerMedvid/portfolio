import React, { useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import useStore from "../store/useStore";
import { FOCUS } from "../types";

type Props = {
	nodes: {
		BackWall: Mesh;
		RightWall: Mesh;
		Roof: Mesh;
	};
	materials: {
		White: MeshStandardMaterial;
	};
};

export default function Walls({ nodes, materials }: Props) {
	const backWallRef = useRef<MeshStandardMaterial>(null);
	const rightWallRef = useRef<MeshStandardMaterial>(null);

	useEffect(() => {
		useStore.subscribe(
			(state) => state.focus,
			(val) => {
				if (!rightWallRef.current || !backWallRef.current) return;

				if (val === FOCUS.RECORDS) {
					rightWallRef.current.opacity = 1;
					backWallRef.current.opacity = 0;
				} else {
					rightWallRef.current.opacity = 0;
					backWallRef.current.opacity = 0;
				}
			}
		);
	});

	return (
		<>
			<mesh
				geometry={nodes.BackWall.geometry}
				material={materials.White}
				position={[-0.149, -0.3, 4.001]}
				castShadow
			>
				<meshStandardMaterial
					transparent
					opacity={0}
					ref={backWallRef}
				/>
			</mesh>
			<mesh
				geometry={nodes.RightWall.geometry}
				material={materials.White}
				position={[4, -0.3, -0.15]}
				castShadow
			>
				<meshStandardMaterial
					transparent
					opacity={0}
					ref={rightWallRef}
				/>
			</mesh>
		</>
	);
}
