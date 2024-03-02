import { Mesh, MeshStandardMaterial } from "three";
import { FOCUS } from "../types";
import ContactBookLink from "./ContactBookLink";
import { useTranslations } from "next-intl";
import { useFocus } from "../hooks";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		ContactBook: Mesh;
		BookPaper: Mesh;
		Email_1: Mesh;
		Email_2: Mesh;
		LeftTopPage: Mesh;
		LinkedIn_1: Mesh;
		LinkedIn_2: Mesh;
		Pencil_1: Mesh;
		Pencil_2: Mesh;
		X_1: Mesh;
		X_2: Mesh;
	};
	materials: {
		"Black.001": MeshStandardMaterial;
		White: MeshStandardMaterial;
		SVGMat: MeshStandardMaterial;
		Black: MeshStandardMaterial;
		Wood: MeshStandardMaterial;
		BookMessage: MeshStandardMaterial;
	};
};

export default function ContactBook({ nodes, materials, ...rest }: Props) {
	const t = useTranslations("Links");
	const { handleFocus, onPointerEnder, onPointerLeave } = useFocus({
		focusArea: FOCUS.CONTACT,
	});

	const letterMaterial = <meshBasicMaterial {...materials.SVGMat} />;
	const backMaterial = (
		<meshBasicMaterial
			{...materials.White}
			opacity={0}
			transparent
		/>
	);

	return (
		<group
			{...rest}
			onPointerDown={() => console.log("down")}
		>
			<mesh
				geometry={nodes.ContactBook.geometry}
				material={materials["Black.001"]}
			>
				<mesh
					geometry={nodes.BookPaper.geometry}
					material={materials.White}
					position={[0, 0.013, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					receiveShadow
				/>
				<mesh
					geometry={nodes.LeftTopPage.geometry}
					material={materials.BookMessage}
					position={[0, 0.013, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					receiveShadow
					onPointerEnter={onPointerEnder}
					onPointerLeave={onPointerLeave}
					onPointerDown={handleFocus}
				/>
				<group
					position={[-0.019, 0.083, 0.037]}
					rotation={[Math.PI / 2, 0, -2.356]}
				>
					<mesh
						geometry={nodes.Pencil_1.geometry}
						material={materials.Black}
					/>
					<mesh
						geometry={nodes.Pencil_2.geometry}
						material={materials.Wood}
					/>
				</group>

				<ContactBookLink
					nodes={{ letter: nodes.LinkedIn_1, back: nodes.LinkedIn_2 }}
					materials={{ letter: letterMaterial, back: backMaterial }}
					position={[0.188, 0.046, -0.122]}
					rotation={[0, 0, -0.05]}
					href="https://www.linkedin.com/in/sergii-medvid/"
					redirectText={t("LinkedIn")}
				/>
				<ContactBookLink
					nodes={{ letter: nodes.X_1, back: nodes.X_2 }}
					materials={{ letter: letterMaterial, back: backMaterial }}
					position={[0.194, 0.056, -0.006]}
					rotation={[0, 0, -0.05]}
					href="https://twitter.com/SerMedvid"
					redirectText={t("X")}
				/>
				<ContactBookLink
					nodes={{ letter: nodes.Email_1, back: nodes.Email_2 }}
					materials={{ letter: letterMaterial, back: backMaterial }}
					position={[0.18, 0.056, 0.087]}
					rotation={[0, 0, -0.05]}
					href="mailto:mr.medvid@gmail.com"
					redirectText={t("Email")}
				/>
			</mesh>
		</group>
	);
}
