import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { _blur } from "../../lib/recoil-atoms";

export default function MenuContentChakraWrapper({
	children,
}: {
	children: ReactNode;
}) {
	const { colorMode } = useColorMode();
	const [blurMode] = useRecoilState(_blur);

	return (
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
	);
}
