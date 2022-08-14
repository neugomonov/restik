import React from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import SidebarWithHeader from "../components/SidebarWithHeader";
import VideoBox from "../components/VideoBox";
import NewsBox from "../components/NewsBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	Tag,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import info from "../lib/info";
import { BiErrorAlt } from "react-icons/bi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Index: NextPage<unknown> = () => {
	const { colorMode } = useColorMode();
	const router = useRouter();

	return (
		<>
			<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
				<Flex
					flexDirection={{ base: "column", xl: "row" }}
					mr={{ base: "1rem", xl: "0" }}
				>
					<Box
						transition=".3s ease"
						borderWidth="1px"
						borderRadius="lg"
						padding="1rem"
						margin=".5rem"
						width={{ base: "100%", xl: "5xl" }}
						mt={{ base: "6rem", md: ".5rem" }}
						boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
						backgroundColor={
							colorMode === "dark"
								? "rgba(6, 8, 13, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
						position="relative"
						backdropFilter="auto"
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
								<Tag
									textTransform="uppercase"
									colorScheme="orange"
									variant="solid"
									mb="1rem"
								>
									404{" "}
								</Tag>
							)}
							<IconButton aria-label="Error" icon={<BiErrorAlt />} />
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
								<Heading>Страница не найдена 🤔</Heading>
								<Text colorScheme={"gray"}>
									Такой страницы не существует. Что-то здесь не так. Лучше
									вернуться назад.
								</Text>
								<Button
									leftIcon={<ArrowBackIcon />}
									colorScheme="orange"
									onClick={async () => {
										await router.back();
									}}
								>
									Назад
								</Button>
							</Stack>
						</Stack>
					</Box>
					<Flex
						flexShrink={10}
						flexDirection="column"
						alignItems={"center"}
						width={{ base: "100%", xl: "xl" }}
						margin=".5rem"
					>
						<VideoBox />
						<NewsBox />
					</Flex>
				</Flex>
				<LargeWithNewsletter />
			</Flex>
			<SidebarWithHeader children />

			<Cart />
		</>
	);
};

export default Index;
