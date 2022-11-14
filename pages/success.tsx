import {
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import MotionBox from "../components/motion/MotionBox";
import MotionTag from "../components/motion/MotionTag";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";

function Success() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t, lang } = useTranslation("common");
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
					<MotionTag>{info.order[lang as "en" | "ru"]}</MotionTag>
				)}{" "}
				<MotionBox>
					<IconButton aria-label="Check" icon={<AiOutlineCheckCircle />} />
				</MotionBox>
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
						src="images/success.gif"
						alt="success gif"
					/>{" "}
					<Heading>{t("successHeading")}</Heading>
					<Text colorScheme={"gray"}>{t("successText")}</Text>
					<Button
						leftIcon={<CgProfile />}
						colorScheme="orange"
						onClick={handleClick("/profile")}
					>
						{t("successButton")}
					</Button>
				</Stack>
			</Stack>
		</>
	);
}

Success.PageLayout = WithSideContentLayout;

export default Success;
