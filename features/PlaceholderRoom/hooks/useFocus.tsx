import { useCallback, useEffect, useRef } from "react";
import useStore from "../store/useStore";
import { FOCUS } from "../types";

type Props = {
	focusArea: FOCUS;
};

export default function useFocus({ focusArea }: Props) {
	const setFocus = useStore((state) => state.setFocus);
	const setIsHoverOver = useStore((state) => state.setIsHoverOver);
	const isChosenRef = useRef(false);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.focus,
			(val) => {
				isChosenRef.current = val === focusArea;
			}
		);

		return () => {
			unsubscribe();
		};
	}, [focusArea]);

	const handleFocus = useCallback(() => {
		setFocus(isChosenRef.current ? FOCUS.CENTER : focusArea);
	}, [focusArea, setFocus]);

	return {
		handleFocus,
		onPointerEnder: () => setIsHoverOver(true),
		onPointerLeave: () => setIsHoverOver(false),
	};
}
