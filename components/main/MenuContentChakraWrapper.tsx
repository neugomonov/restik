import { Box, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
			as={motion.div}
			exit="hidden"
			initial="appearing"
			animate="visible"
			variants={{
				hidden: {
					y: "-1vh",
					x: ["0vw", "-100vw"],
					scale: 0.9,
					position: "absolute",
					zIndex: -1,
					transition: { type: "spring", bounce: 0.3, duration: 0.8 },
				},
				appearing: { y: window.innerHeight },
				visible: {
					y: 0,
					scale: 1,
					transition: { type: "spring", bounce: 0.3 },
				},
			}}
			transition="box-shadow .5s ease, background-color .5s ease, border .3s ease, border-color .3s ease, background .3s ease, backdrop-filter .3s ease"
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
