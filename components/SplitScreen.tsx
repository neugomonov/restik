import { IconProps, useBreakpointValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import index from "../lib";

const Button = dynamic(async () => (await import("@chakra-ui/react")).Button);
const Flex = dynamic(async () => (await import("@chakra-ui/react")).Flex);
const Heading = dynamic(async () => (await import("@chakra-ui/react")).Heading);
const Icon = dynamic(async () => (await import("@chakra-ui/react")).Icon);
const Image = dynamic(async () => (await import("@chakra-ui/react")).Image);
const Stack = dynamic(async () => (await import("@chakra-ui/react")).Stack);
const Text = dynamic(async () => (await import("@chakra-ui/react")).Text);

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
							{index.SplitScreen1[lang as "en" | "ru"] ?? t("sampleHeading")}
						</Text>
						<br />{" "}
						<Text color={"orange.400"} as={"span"}>
							{index.SplitScreen2[lang as "en" | "ru"]}
						</Text>{" "}
					</Heading>
					<Text fontSize={{ base: "md", lg: "lg" }} colorScheme={"gray"}>
						{index.SplitScreen3[lang as "en" | "ru"] ?? t("sampleText")}
					</Text>
					<Stack direction={{ base: "column", md: "row" }} spacing={4}>
						<Button colorScheme={"orange"} onClick={handleClick("/promo")}>
							{index.SplitScreenButton1[lang as "en" | "ru"] ??
								t("sampleButton")}
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
			<Flex
				flex={1}
				justify={"center"}
				align={"center"}
				position={"relative"}
				w={"full"}
			>
				<Blob
					w={"150%"}
					h={"150%"}
					position={"absolute"}
					top={0}
					left={0}
					transform={"rotate(180deg)"}
					zIndex={-1}
					color={"orange.400"}
				/>
				<Blob
					w={"150%"}
					h={"150%"}
					position={"absolute"}
					top={"-50%"}
					left={0}
					transform={"rotate(180deg)"}
					zIndex={-1}
					color={"orange.400"}
				/>
				<Image
					alt={"Pizza table Image"}
					rounded={"2xl"}
					borderRadius="2xl"
					height="20rem"
					width="100rem"
					objectFit="cover"
					boxShadow={"2xl"}
					src={
						"https://images.notquitenigella.com/images/spaghetti-pizza/__spaghetti-pizza-recipe-2.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
					}
				/>
			</Flex>
		</Stack>
	);
}

export const Blob = (props: IconProps) => {
	return (
		<Icon
			width={"50%"}
			viewBox="0 0 578 440"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
				fill="currentColor"
			/>
		</Icon>
	);
};
