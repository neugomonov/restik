import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
	ChakraProvider,
	createLocalStorageManager,
	extendTheme,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import SidebarWithHeader from "../components/SidebarWithHeader";
import StateSaver from "../components/state-saver";
import info from "../lib/info";
import { BlurState, CartState, _blur, _cart } from "../lib/recoil-atoms";

const client = new ApolloClient({
	uri: process.env.SERVER_URL,
	cache: new InMemoryCache(),
});

type ComponentWithPageLayout = AppProps & {
	Component: AppProps["Component"] & {
		PageLayout?: React.ComponentType;
	};
};
const theme = extendTheme({
	styles: {
		global: {
			body: {
				transitionProperty: "all",
				transitionDuration: "normal",
			},
		},
	},
	config: {
		disableTransitionOnChange: false,
	},
});
const manager = createLocalStorageManager("my-key");

const App = ({
	Component,
	pageProps: { session, ...pageProps },
}: ComponentWithPageLayout): JSX.Element => {
	const [cart, setCart] = useState<CartState | undefined>(undefined);
	const [blurMode, setBlurMode] = useState<BlurState | undefined>(undefined);
	useEffect(() => {
		const previous = localStorage.getItem("cart");

		if (previous) {
			try {
				setCart(JSON.parse(previous));
			} catch {
				setCart({ items: [], total: 0 });
			}
		} else {
			localStorage.setItem("cart", JSON.stringify({ items: [], total: 0 }));
			setCart({ items: [], total: 0 });
		}
		const previousBlur = localStorage.getItem("blur");
		if (previousBlur) {
			try {
				setBlurMode(JSON.parse(previousBlur));
			} catch {
				setBlurMode({ blur: true });
			}
		} else {
			localStorage.setItem("blur", JSON.stringify({ blurMode: true }));
			setBlurMode({ blur: true });
		}
	}, []);
	const { lang } = useTranslation("common");
	const router = useRouter();

	// TODO: make a conditional AnimatePresence render. When the layout hasn't changed, AnimatePresence is placed inside the layout. When it has changed, AnimatePresence is placed outside the layout.
	// const [layout, setLayout] = useState<Component.PageLayout>(
	// 	Component.PageLayout
	// );
	// const renderLayout = () => {
	// 	setLayout((prevState) => ({prevState.Component.PageLayout)});
	// };

	// TODO: implement code splitting as dynamic imports, load modules asynchronously (await import, React.lazy) for a faster initial loading, shrink the initial  bundle size
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme} colorModeManager={manager}>
					<Global
						styles={css`
							body {
								position: relative;
								&::before {
									content: " ";
									position: fixed;
									width: 100%;
									height: 100%;
									top: 0;
									left: 0;
									background-color: black;
									background: url("images/pizzabackground.jpg") no-repeat center
										center;
									background-size: cover;
									will-change: transform;
									z-index: -1;
								}
								*::-moz-selection {
									/* Code for Firefox */
									color: black;
									background: #f39300;
								}
								*::selection {
									color: black;
									background: #f39300;
								}
							}
						`}
					/>
					<Head>
						<title>{info.title[lang as "en" | "ru"]}</title>
					</Head>
					{cart && blurMode ? (
						<RecoilRoot
							initializeState={({ set }) => {
								if (cart) {
									set(_cart, cart);
								}
								if (blurMode) {
									set(_blur, blurMode);
								}
							}}
						>
							<StateSaver>
								<NextNProgress
									options={{ showSpinner: false }}
									color="#DD6B20"
								/>
								{Component.PageLayout ? (
									<Component.PageLayout {...pageProps}>
										{
											/**
											 * The reason I had to write this nonsensical condition is because I was getting an error after coming out of a single chat screen.
											 * // And if I got it - everyone has to get it.
											 * The error: TypeError: Cannot read properties of undefined (reading 'indexOf')
											 * On client: Application error: a client-side exception has occurred (see the browser console for more information).
											 */
											new RegExp("/chat/.*").test(router.asPath) ? (
												<Component {...pageProps} key={router.asPath} />
											) : (
												<AnimatePresence>
													<Component {...pageProps} key={router.asPath} />
												</AnimatePresence>
											)
										}
									</Component.PageLayout>
								) : (
									<Component {...pageProps} />
								)}
								<LargeWithNewsletter />
								<SidebarWithHeader />
								<Cart />
							</StateSaver>
						</RecoilRoot>
					) : (
						<></>
					)}
				</ChakraProvider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default App;
