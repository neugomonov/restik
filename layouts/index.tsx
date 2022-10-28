import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import { ThemeContext } from "../components/ThemeContext";

export function IndexLayout({ children }: { children: React.ReactNode }) {
	const { colorMode } = useColorMode();
	const { darkMode } = useContext(ThemeContext);

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
						width="100%"
						mt={{ base: "6rem", md: ".5rem" }}
						boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
						backgroundColor={
							colorMode === "dark"
								? "rgba(6, 8, 13, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
						position="relative"
						backdropFilter="auto"
						backdropBlur={darkMode ? "20px" : "0px"}
					>
						{children}
					</Box>
				</Flex>

				<LargeWithNewsletter />
			</Flex>

			<Cart />
		</>
	);
}
