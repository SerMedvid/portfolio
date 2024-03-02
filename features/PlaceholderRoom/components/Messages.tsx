import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounceEffect } from "ahooks";
import useStore from "../store/useStore";
import { useTranslations } from "next-intl";

export default function Messages() {
	const isReady = useStore((state) => state.isReady);
	const t = useTranslations("Messages");

	useDebounceEffect(
		() => {
			if (isReady) {
				toast(t("Intro"));
				toast(t("First"), { delay: 2000 });
				toast(t("Second"), { delay: 4000 });
				toast(t("Third"), { delay: 6000 });
			}
		},
		[isReady, t],
		{ wait: 2000 }
	);

	return (
		<ToastContainer
			position="bottom-right"
			autoClose={10000}
			limit={2}
			closeOnClick
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
			transition={Bounce}
		/>
	);
}
