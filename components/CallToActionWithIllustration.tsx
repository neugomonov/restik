import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import index from "../lib";

const Button = dynamic(async () => (await import("@chakra-ui/react")).Button);
const Container = dynamic(
	async () => (await import("@chakra-ui/react")).Container
);
const Flex = dynamic(async () => (await import("@chakra-ui/react")).Flex);
const Heading = dynamic(async () => (await import("@chakra-ui/react")).Heading);
const Image = dynamic(async () => (await import("@chakra-ui/react")).Image);
const Stack = dynamic(async () => (await import("@chakra-ui/react")).Stack);
const Text = dynamic(async () => (await import("@chakra-ui/react")).Text);

export default function CallToActionWithIllustration() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t, lang } = useTranslation("home");

	return (
		<Container maxW={"5xl"}>
			<Stack
				textAlign={"center"}
				align={"center"}
				spacing={{ base: 8, md: 10 }}
				pt={{ base: 20, md: 28 }}
			>
				<Heading
					fontWeight={600}
					fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
					lineHeight={"110%"}
				>
					{index.CallToActionWithIllustration1[lang as "en" | "ru"] ??
						t("sampleHeading")}
					<Text as={"span"} color={"orange.400"}>
						{" "}
						{index.CallToActionWithIllustration2[lang as "en" | "ru"] ??
							t("sampleHeading")}
					</Text>
				</Heading>
				<Text colorScheme={"gray"} maxW={"3xl"}>
					{index.CallToActionWithIllustration3[lang as "en" | "ru"] ??
						t("sampleText")}
				</Text>
				<Stack spacing={6} direction={{ base: "column", md: "row" }}>
					<Button px={6} colorScheme={"orange"} onClick={handleClick("/news")}>
						{index.CallToActionWithIllustrationButton1[lang as "en" | "ru"] ??
							t("sampleButton")}
					</Button>
					<Button px={6} onClick={handleClick("/about")}>
						{index.CallToActionWithIllustrationButton2[lang as "en" | "ru"] ??
							t("sampleButton")}
					</Button>
				</Stack>
				<Flex w={"full"} justifyContent={"center"}>
					<Image
						alt="restaurant illustration"
						borderRadius="2xl"
						height="25rem"
						width="100rem"
						boxShadow={"2xl"}
						objectFit="cover"
						src="https://cdn.dribbble.com/users/5950507/screenshots/14543756/media/3cf8ea17f7e1a1b04c56e8b82f8b1a28.gif"
					/>
				</Flex>
			</Stack>
		</Container>
	);
}
