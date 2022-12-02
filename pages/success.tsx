import {
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import LoginHeader from "../components/LoginHeader";
import MenuContentChakraWrapper from "../components/main/MenuContentChakraWrapper";
import MotionTag from "../components/motion/MotionTag";
import MotionTopIconBox from "../components/motion/MotionTopIconBox";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";

function SuccessHeader() {
	const { lang } = useTranslation("common");
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			{info.isDevelopment && (
				<MotionTag>{info.order[lang as "en" | "ru"]}</MotionTag>
			)}
			<MotionTopIconBox>
				<IconButton aria-label="Check" icon={<AiOutlineCheckCircle />} />
			</MotionTopIconBox>
		</div>
	);
}

function SuccessContent() {
	const { data: session } = useSession();
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t } = useTranslation("common");
	return (
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
				/>
				<Heading>{t("successHeading")}</Heading>
				<Text colorScheme={"gray"}>{t("successText")}</Text>
				{session ? (
					<Button
						leftIcon={<CgProfile />}
						colorScheme="orange"
						onClick={handleClick("/profile")}
					>
						{t("successButton")}
					</Button>
				) : (
					<LoginHeader />
				)}
			</Stack>
		</Stack>
	);
}

function Success() {
	return (
		<>
			<MenuContentChakraWrapper>
				<SuccessHeader></SuccessHeader>
				<SuccessContent></SuccessContent>
			</MenuContentChakraWrapper>
		</>
	);
}

Success.PageLayout = WithSideContentLayout;

export default Success;
