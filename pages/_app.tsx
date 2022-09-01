import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { Global, css } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { _cart, CartState } from "../lib/recoil-atoms";
import StateSaver from "../components/state-saver";
import info from "../lib/info";
import NextNProgress from "nextjs-progressbar";
import SidebarWithHeader from "../components/SidebarWithHeader";

const client = new ApolloClient({
	uri: process.env.SERVER_URL,
	cache: new InMemoryCache(),
});

type ComponentWithPageLayout = AppProps & {
	Component: AppProps["Component"] & {
		PageLayout?: React.ComponentType;
	};
};

const App = ({
	Component,
	pageProps: { session, ...pageProps },
}: ComponentWithPageLayout): JSX.Element => {
	const [cart, setCart] = useState<CartState | undefined>(undefined);
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
	}, []);

	return (
		<SessionProvider session={session}>
			<ApolloProvider client={client}>
				<ChakraProvider>
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
							}
						`}
					/>
					<Head>
						<title>{info.name}</title>
					</Head>
					{cart && (
						<RecoilRoot
							initializeState={({ set }) => {
								if (cart) {
									set(_cart, cart);
								}
							}}
						>
							<StateSaver>
								<NextNProgress
									options={{ showSpinner: false }}
									color="#DD6B20"
								/>
								<SidebarWithHeader children />
								{Component.PageLayout ? (
									<Component.PageLayout>
										<Component {...pageProps} />
									</Component.PageLayout>
								) : (
									<Component {...pageProps} />
								)}
							</StateSaver>
						</RecoilRoot>
					)}
				</ChakraProvider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default App;
