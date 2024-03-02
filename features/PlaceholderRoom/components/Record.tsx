import { Group, Mesh, MeshStandardMaterial } from "three";
import useStore from "../store/useStore";
import { FOCUS, SONG } from "../types";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

type Props = JSX.IntrinsicElements["group"] & {
	position: [number, number, number];
	nodes: {
		VinylBlack: Mesh;
		VinylWhite: Mesh;
		Cover: Mesh;
	};
	materials: {
		VinylBlack: MeshStandardMaterial;
		VinylWhite: MeshStandardMaterial;
		Cover: MeshStandardMaterial;
	};
	recordId: SONG;
};

const DEFAULT_VINYL_POSITION_X = 0.007;

export default function Record({ nodes, materials, recordId, ...rest }: Props) {
	const setIsHoverOver = useStore((state) => state.setIsHoverOver);
	const setPreviewRecord = useStore((state) => state.setPreviewRecord);
	const setSong = useStore((state) => state.setSong);
	const setFocus = useStore((state) => state.setFocus);
	const setIsMusicOn = useStore((state) => state.setIsMusicOn);

	const isChosenRef = useRef(false);

	const recordRef = useRef<Group>(null);
	const vinylGroupRef = useRef<Group>(null);

	const handleRecordPreview = () => {
		console.log("handleRecordPreview", recordId);

		setPreviewRecord(isChosenRef.current ? SONG.NONE : recordId);
		setFocus(isChosenRef.current ? FOCUS.RECORDS : FOCUS.CENTER);
	};

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.previewRecord,
			(val) => {
				isChosenRef.current = val === recordId;
			}
		);

		return () => {
			unsubscribe();
		};
	}, [recordId]);

	useFrame((_, delta) => {
		if (!recordRef.current || !vinylGroupRef.current) return;

		const positionX = isChosenRef.current
			? rest.position[0] - 1
			: rest.position[0];

		const vimylPositionX = isChosenRef.current
			? DEFAULT_VINYL_POSITION_X - 0.5
			: DEFAULT_VINYL_POSITION_X;

		easing.damp(recordRef.current.position, "x", positionX, 0.15, delta);

		easing.damp(
			vinylGroupRef.current.position,
			"x",
			vimylPositionX,
			0.15,
			delta
		);
	});

	return (
		<group
			{...rest}
			ref={recordRef}
			onPointerEnter={() => setIsHoverOver(true)}
			onPointerLeave={() => setIsHoverOver(false)}
		>
			<mesh
				geometry={nodes.Cover.geometry}
				material={materials.Cover}
				castShadow
				receiveShadow
				onPointerDown={(e) => {
					e.stopPropagation();
					handleRecordPreview();
				}}
			></mesh>
			<group
				ref={vinylGroupRef}
				position={[DEFAULT_VINYL_POSITION_X, 0.004, -0.004]}
				rotation={[-0.002, 0.001, 0]}
			>
				<mesh
					geometry={nodes.VinylBlack.geometry}
					material={materials.VinylBlack}
					onPointerDown={(e) => {
						e.stopPropagation();
						setSong(recordId);
						setIsMusicOn(true);
						handleRecordPreview();
					}}
				/>
				<mesh
					geometry={nodes.VinylWhite.geometry}
					material={materials.VinylWhite}
				/>
			</group>
		</group>
	);
}
