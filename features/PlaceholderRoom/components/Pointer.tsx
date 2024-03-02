import useStore from "../store/useStore";
import { useCursor } from "@react-three/drei";

export default function Pointer() {
	const isHoverOver = useStore((state) => state.isHoverOver);
	useCursor(isHoverOver);

	return null;
}
