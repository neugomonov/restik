import {
	AspectRatio,
	Box,
	Flex,
	Heading,
	IconButton,
	Tag,
	useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BiMoviePlay } from "react-icons/bi";
import info from "../lib/info";
import index from "../lib/index";
import { BlurContext } from "./BlurContext";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

export default function VideoBox() {
	const { colorMode } = useColorMode();
	// @ts-expect-error
	const { blurMode } = useContext(BlurContext);
	const { t, lang } = useTranslation("menu");

	return (
		<Box
			transition=".3s ease"
			borderWidth="1px"
			borderRadius="lg"
			padding="1rem"
			width={{ base: "100%", xl: "100%" }}
			boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
			backgroundColor={
				colorMode === "dark"
					? "rgba(6, 8, 13, 0.75)"
					: "rgba(255, 255, 255, 0.75)"
			}
			position="sticky"
			mb=".5rem"
			top=".5rem"
			backdropFilter={blurMode ? "auto" : "none"}
			backdropBlur="20px"
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{info.isDevelopment && (
					<Tag
						as={motion.div}
						cursor="pointer"
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 1.2, rotate: 10 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.9,
						}}
						whileHover={{
							scale: 1.2,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						{info.video[lang as "en" | "ru"]}
					</Tag>
				)}
				<Box
					as={motion.div}
					drag
					dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
					whileDrag={{ scale: 1.2, rotate: -45 }}
					dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
					whileTap={{
						scale: 0.9,
					}}
					whileHover={{
						scale: 1.2,
						transition: { type: "spring", bounce: 0.8, duration: 1 },
					}}
				>
					<IconButton aria-label="Videos" icon={<BiMoviePlay />} />
				</Box>
			</div>
			<AspectRatio maxW="560px" ratio={16 / 9} my="6" mx="auto">
				<iframe
					title="pizza"
					src="https://www.youtube.com/embed/3ZEGG1mb3Rc?&autoplay=1&mute=1&loop=1&list=PLWDQtIyZRZu17Oha9o2zC0aD7adlmAZl6"
					allowFullScreen
				/>
			</AspectRatio>
			<Flex my="5" justifyContent="center">
				<Heading as="h3" size="md" maxW="61%" textAlign="center">
					{index.videoCapture[lang as "en" | "ru"]}{" "}
				</Heading>
			</Flex>
		</Box>
	);
}
