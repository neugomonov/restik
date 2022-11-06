import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { BiErrorAlt } from "react-icons/bi";
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
						404{" "}
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
					<IconButton aria-label="Error" icon={<BiErrorAlt />} />
				</Box>
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
						style={{ fontSize: "100px", cursor: "pointer" }}
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
