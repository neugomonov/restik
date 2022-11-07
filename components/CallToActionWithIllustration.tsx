import {
	Button,
	Container,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import index from "../lib";

export default function CallToActionWithIllustration() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t, lang } = useTranslation("index");

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
					{index.CallToActionWithIllustration1[lang as "en" | "ru"]}

					<Text as={"span"} color={"orange.400"}>
						{" "}
						{index.CallToActionWithIllustration2[lang as "en" | "ru"]}
					</Text>
				</Heading>
				<Text colorScheme={"gray"} maxW={"3xl"}>
					{index.CallToActionWithIllustration3[lang as "en" | "ru"]}
				</Text>
				<Stack spacing={6} direction={{ base: "column", md: "row" }}>
					<Button px={6} colorScheme={"orange"} onClick={handleClick("/news")}>
						{index.CallToActionWithIllustrationButton1[lang as "en" | "ru"]}
					</Button>
					<Button px={6} onClick={handleClick("/about")}>
						{index.CallToActionWithIllustrationButton2[lang as "en" | "ru"]}
					</Button>
				</Stack>
				<Flex w={"full"} justifyContent={"center"}>
					<Image
						alt="restaurant illustration"
						borderRadius="2xl"
						height="25rem"
						width="100rem"
						height="400px"
						width="1000px"
						objectFit="cover"
						src="https://cdn.dribbble.com/users/5950507/screenshots/14543756/media/3cf8ea17f7e1a1b04c56e8b82f8b1a28.gif"
					/>
				</Flex>
			</Stack>
		</Container>
	);
}
