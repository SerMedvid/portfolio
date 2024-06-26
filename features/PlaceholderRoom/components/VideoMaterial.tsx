import { useVideoTexture } from "@react-three/drei";

type Props = {
	src: string;
};

export default function VideoMaterial({ src }: Props) {
	const video = useVideoTexture(src);

	return (
		<meshBasicMaterial
			map={video}
			toneMapped={false}
		/>
	);
}
