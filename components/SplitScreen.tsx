import {
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import index from "../lib";

export default function SplitScreen() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t, lang } = useTranslation("index");
	return (
		<Stack direction={{ base: "column", lg: "row" }}>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={6} w={"full"} maxW={"lg"}>
					<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
						<Text
							as={"span"}
							position={"relative"}
							_after={{
								content: "''",
								width: "full",
								height: useBreakpointValue({ base: "20%", md: "30%" }),
								position: "absolute",
								bottom: 1,
								left: 0,
								bg: "orange.400",
								zIndex: -1,
							}}
						>
							{index.SplitScreen1[lang as "en" | "ru"]}
						</Text>
						<br />{" "}
						<Text color={"orange.400"} as={"span"}>
							{index.SplitScreen2[lang as "en" | "ru"]}
						</Text>{" "}
					</Heading>
					<Text fontSize={{ base: "md", lg: "lg" }} colorScheme={"gray"}>
						{index.SplitScreen3[lang as "en" | "ru"]}
					</Text>
					<Stack direction={{ base: "column", md: "row" }} spacing={4}>
						<Button colorScheme={"orange"} onClick={handleClick("/promo")}>
							{index.SplitScreenButton1[lang as "en" | "ru"]}
						</Button>
						<Button
							onClick={async () => {
								await router.push("https://t.me/neugomonov_v");
							}}
						>
							{index.SplitScreenButton2[lang as "en" | "ru"]}
						</Button>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={"Login Image"}
					rounded={"2xl"}
					borderRadius="2xl"
					height="20rem"
					width="100rem"
					objectFit="cover"
					src={
						"https://images.notquitenigella.com/images/spaghetti-pizza/__spaghetti-pizza-recipe-2.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
					}
				/>
			</Flex>
		</Stack>
	);
}
