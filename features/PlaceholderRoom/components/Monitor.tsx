import React, { Suspense, useEffect, useState } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import VideoMaterial from "./VideoMaterial";
import useStore from "../store/useStore";
import { FOCUS } from "../types";
import { useDebounceEffect } from "ahooks";
import { Html } from "@react-three/drei";
import { useFocus } from "../hooks";
import { useTranslations } from "next-intl";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Monitor: Mesh;
		Display: Mesh;
		DisplayActive: Mesh;
	};
	materials: {
		Steel: MeshStandardMaterial;
		["Black.002"]: MeshStandardMaterial;
	};
};

export default function Monitor({ nodes, materials, ...rest }: Props) {
	const isFocused = useStore((state) => state.focus === FOCUS.MONITOR);
	const [canShow, setCanShow] = useState(false);

	const { handleFocus, onPointerEnder, onPointerLeave } = useFocus({
		focusArea: FOCUS.MONITOR,
	});
	const t = useTranslations("Monitor");

	useEffect(() => {
		if (!isFocused) {
			setCanShow(false);
		}
	}, [isFocused]);

	useDebounceEffect(
		() => {
			if (isFocused) {
				setCanShow(true);
			}
		},
		[isFocused],
		{ wait: 1500 }
	);

	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Monitor.geometry}
				material={materials.Steel}
				castShadow
				receiveShadow
			>
				<meshStandardMaterial metalness={0.99} />
				<mesh
					geometry={nodes.Display.geometry}
					material={materials["Black.002"]}
					castShadow
					receiveShadow
				>
					{canShow && (
						<Html
							center
							position-y={0.5}
						>
							<a
								target="_blank"
								href={"https://threejslab.vercel.app/"}
								className="flex bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 duration-300 whitespace-nowrap"
							>
								<span>{t("callout")}</span>
							</a>
						</Html>
					)}
				</mesh>
				<mesh
					geometry={nodes.DisplayActive.geometry}
					onPointerEnter={onPointerEnder}
					onPointerLeave={onPointerLeave}
					onPointerDown={handleFocus}
				>
					<Suspense fallback={null}>
						<VideoMaterial src={"/assets/PlaceholderRoom/video_texture.mp4"} />
					</Suspense>
				</mesh>
			</mesh>
		</group>
	);
}
