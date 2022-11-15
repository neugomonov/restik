import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { BiErrorAlt } from "react-icons/bi";
import MotionTopIconBox from "../components/motion/MotionTopIconBox";
import MotionTag from "../components/motion/MotionTag";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";

function FourOFour() {
	const router = useRouter();
	const { t, lang } = useTranslation("404");
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{info.isDevelopment && <MotionTag>404</MotionTag>}
				<MotionTopIconBox>
					<IconButton aria-label="Error" icon={<BiErrorAlt />} />
				</MotionTopIconBox>
			</div>
			<Stack spacing={5}>
				<Stack
					minW={{ base: "auto", xl: "20rem" }}
					spacing={3}
					px={{ base: "1rem", xl: "10%" }}
					alignItems="center"
				>
					<Image
						borderRadius="full"
						boxSize="50%"
						src="images/404.webp"
						alt="404"
					/>{" "}
					<motion.div
						animate={{
							rotate: [0, -45, -45, 0],
							scale: [1, 1.2, 1.2, 1],
							transition: { repeat: Infinity, duration: 1 },
						}}
						drag
						dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.9,
						}}
						whileHover={{
							scale: 1.2,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
						style={{ fontSize: "6rem", cursor: "pointer" }}
					>
						🤔
					</motion.div>
					<Heading>{t("heading")} </Heading>{" "}
					<Text colorScheme={"gray"}>{t("text")} </Text>
					<Button
						leftIcon={<ArrowBackIcon />}
						colorScheme="orange"
						onClick={async () => {
							await router.back();
						}}
					>
						{t("button")}
					</Button>
				</Stack>
			</Stack>
		</>
	);
}

FourOFour.PageLayout = WithSideContentLayout;

export default FourOFour;
