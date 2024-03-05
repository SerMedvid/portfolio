import { useEffect, useRef } from "react";
import useStore from "../store/useStore";

type Props = {
	onChange?: (isDay: boolean) => void;
};

export default function useDaytime({ onChange }: Props = {}) {
	const isDayRef = useRef(true);

	useEffect(() => {
		useStore.subscribe(
			(state) => state.isDay,
			(val) => {
				isDayRef.current = val;

				if (onChange && typeof onChange === "function") {
					onChange(val);
				}
			},
			{ fireImmediately: true }
		);
	}, [onChange]);

	return isDayRef;
}
