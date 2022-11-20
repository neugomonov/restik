import {
	AspectRatio,
	Box,
	Flex,
	Heading,
	IconButton,
	useColorMode,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { BiMoviePlay } from "react-icons/bi";
import { useRecoilState } from "recoil";
import index from "../lib/index";
import info from "../lib/info";
import { _blur } from "../lib/recoil-atoms";
import MotionTopIconBox from "./motion/MotionTopIconBox";
import MotionTag from "./motion/MotionTag";

export default function VideoBox() {
	const { colorMode } = useColorMode();
	const [blurMode] = useRecoilState(_blur);
	const { lang } = useTranslation("menu");

	return (
		<Box
			transition="box-shadow .5s ease, background-color .5s ease, border .5s ease, background .6s ease, backdrop-filter .3s ease"
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
			backdropFilter={blurMode.blur ? "auto" : "none"}
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
					<MotionTag>{info.video[lang as "en" | "ru"]}</MotionTag>
				)}
				<MotionTopIconBox>
					<IconButton aria-label="Videos" icon={<BiMoviePlay />} />
				</MotionTopIconBox>
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
