import {
	Button,
	Flex,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import index from "../lib";
import MotionIndexPageButtonBox from "./motion/MotionIndexPageButtonBox";

export default function WithBackgroundImage() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { lang } = useTranslation("index");
	return (
		<Flex
			w={"full"}
			h={"100vh"}
			backgroundImage={
				"url(https://c.tenor.com/BzlZ-dn6xKoAAAAC/oven-cooking.gif?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
			}
			backgroundSize={"cover"}
			backgroundPosition={"center center"}
			borderRadius="2xl"
		>
			<VStack
				w={"full"}
				justify={"center"}
				px={useBreakpointValue({ base: 4, md: 8 })}
				bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
				borderRadius="2xl"
			>
				<Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
					<Text
						color={"white"}
						fontWeight={700}
						lineHeight={1.2}
						fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
					>
						{index.WithBackgroundImage1[lang as "en" | "ru"]}
					</Text>
					<Text
						as={"span"}
						color={"orange.400"}
						fontWeight={700}
						lineHeight={0}
						pb="1rem"
						fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
					>
						{index.WithBackgroundImage2[lang as "en" | "ru"]}
					</Text>
					<Stack direction={"row"}>
						<MotionIndexPageButtonBox>
							<Button
								colorScheme={"orange"}
								size="lg"
								data-testid="button"
								boxShadow={useColorModeValue(
									"xl",
									"0 0 5px 1px #fff, 0 0 10px 7px #ECC94B, 0 0 20px 15px #ED8936"
								)}
								onClick={handleClick("/menu")}
							>
								{index.WithBackgroundImageButton[lang as "en" | "ru"]}
							</Button>
						</MotionIndexPageButtonBox>
					</Stack>
				</Stack>
			</VStack>
		</Flex>
	);
}
