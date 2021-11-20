import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/styles";
import { NotificationsProvider } from "@mantine/notifications";
import Torneos from "../components/Torneos";

const MyApp = ({ Component, pageProps }: AppProps) => (
	<MantineProvider
		withGlobalStyles
		withNormalizeCSS
		theme={{ colorScheme: "dark" }}
	>
		<NotificationsProvider>
			<Torneos>
				<Component {...pageProps} />
			</Torneos>
		</NotificationsProvider>
	</MantineProvider>
);

export default MyApp;
