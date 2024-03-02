import { Mesh, MeshBasicMaterial } from "three";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import useStore from "../store/useStore";
import { FOCUS } from "../types";

import { useDebounceEffect } from "ahooks";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: { letter: Mesh; back: Mesh };
	materials: { letter: JSX.Element; back: JSX.Element };
	redirectText: string;
	href: string;
};

export default function ContactBookLink({
	nodes,
	materials,
	redirectText,
	href,
	...rest
}: Props) {
	const [canShow, setCanShow] = useState(false);
	const ref = useRef<Mesh<typeof nodes.back.geometry, MeshBasicMaterial>>(null);
	const isBookFocused = useStore((state) => state.focus === FOCUS.CONTACT);

	const linkRef = useRef<ElementRef<"a">>(null);

	useDebounceEffect(
		() => {
			if (isBookFocused) {
				setCanShow(true);
			}
		},
		[isBookFocused],
		{ wait: 1500 }
	);

	useEffect(() => {
		if (!isBookFocused) {
			setCanShow(false);
		}
	}, [isBookFocused]);

	return (
		<group {...rest}>
			<mesh geometry={nodes.letter.geometry}>{materials.letter}</mesh>
			<mesh
				ref={ref}
				geometry={nodes.back.geometry}
			>
				{materials.back}
			</mesh>

			{canShow && (
				<Html center>
					<a
						target="_blank"
						href={href}
						ref={linkRef}
						className="flex min-w-[65px] text-sm"
					>
						<p>{redirectText}</p>
					</a>
				</Html>
			)}
		</group>
	);
}
