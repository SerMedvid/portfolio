import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";

type Props = {
	locale: string;
	children: React.ReactNode;
};

export default function ClientLocalization({ locale, children }: Props) {
	const messages = useMessages();

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
		>
			{children}
		</NextIntlClientProvider>
	);
}
