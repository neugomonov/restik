import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import NewsBox from "../components/NewsBox";
import PromoBox from "../components/PromoBox";
import VideoBox from "../components/VideoBox";
import { _blur, _cart } from "../lib/recoil-atoms";

export function WithSideContentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [cart] = useRecoilState(_cart);
	const { colorMode } = useColorMode();
	const [blurMode] = useRecoilState(_blur);
	return (
		<>
			<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
				<Flex
					flexDirection={{ base: "column", xl: "row" }}
					mr={{ base: "1rem", xl: "0" }}
				>
					<Box
						transition=".3s ease"
						borderWidth="1px"
						borderRadius="lg"
						padding="1rem"
						margin=".5rem"
						width={{ base: "100%", xl: "5xl" }}
						mt={{ base: "6rem", md: ".5rem" }}
						boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
						backgroundColor={
							colorMode === "dark"
								? "rgba(6, 8, 13, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
						position="relative"
						backdropFilter={blurMode.blur ? "auto" : "none"}
						backdropBlur="20px"
					>
						{children}
					</Box>

					<Flex
						flexShrink={10}
						flexDirection="column"
						alignItems={"center"}
						width={{ base: "100%", xl: "xl" }}
						margin=".5rem"
					>
						<VideoBox />
						{Math.random() < 0.5 ? <PromoBox /> : <NewsBox />}
					</Flex>
				</Flex>
				<LargeWithNewsletter />
			</Flex>
			<Cart />
		</>
	);
}
