import React from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import SidebarWithHeader from "../components/SidebarWithHeader";
import VideoBox from "../components/VideoBox";
import NewsBox from "../components/NewsBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import OrdersTable from "../components/OrdersTable";
import ProfileButtons from "../components/ProfileButtons";
import {
	Avatar,
	Box,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	VStack,
	Tag,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import info from "../lib/info";
import { CgProfile } from "react-icons/cg";
import { useSession } from "next-auth/react";

const Index: NextPage<unknown> = () => {
	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const { data: session } = useSession();

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
									Профиль{" "}
								</Tag>
							)}
							<IconButton aria-label="Profile" icon={<CgProfile />} />
						</div>
						<Stack spacing={5}>
							<Stack
								minW={{ base: "auto", xl: "20rem" }}
								spacing={3}
								px={{ base: "1rem", xl: "10%" }}
								direction={"row"}
							>
								<Stack
									direction={{ base: "column-reverse", lg: "row" }}
									spacing={3}
								>
									<Box
										padding="1rem"
										width="100%"
										minW={{ base: "auto", xl: "50%" }}
									>
										{" "}
										<Flex
											alignItems={"center"}
											justifyContent={"center"}
											mx="2"
										>
											<Box
												p={4}
												alignItems={"center"}
												justifyContent={"center"}
												transition=".3s ease"
												borderWidth="1px"
												borderRadius="lg"
												boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
												backgroundColor={
													colorMode === "dark"
														? "rgba(6, 8, 13, 0.25)"
														: "rgba(255, 255, 255, 0.25)"
												}
												position="relative"
											>
												<VStack>
													<Avatar size={"3xl"} src={session?.user?.image!} />
													<VStack alignItems="center" spacing="0" ml="2">
														<Text fontSize="3xl">{session?.user?.name}</Text>
														<Text
															fontSize="xl"
															color={useColorModeValue("gray.600", "gray.300")}
														>
															{session?.user?.email!}
														</Text>
														<ProfileButtons />{" "}
													</VStack>
													<Box display={{ base: "none", md: "flex" }}>
														<FiChevronDown />
													</Box>
												</VStack>
											</Box>
										</Flex>
									</Box>
									<Stack
										direction="column"
										pl={{ base: "none", xl: "10%" }}
										spacing={5}
									>
										<Heading size="lg">
											Это ваш профиль. Здесь вы можете редактировать ваши
											данные.{" "}
										</Heading>
										<Image
											src="https://images.squarespace-cdn.com/content/v1/529fb134e4b0dbf53fa8fa91/1519937177934-Y9HTRD1O0HTVDJECU42X/02_.gif"
											draggable={false}
											loading="lazy"
											decoding="async"
											width="auto"
											height={300}
											objectFit="cover"
											borderRadius="md"
										/>
									</Stack>
								</Stack>
							</Stack>
							<Stack
								alignItems={"center"}
								justifyContent={"center"}
								direction="column"
							>
								<Box
									borderWidth="1px"
									borderRadius="lg"
									padding="1rem"
									width="100%"
									minW={{ base: "auto", xl: "50%" }}
								>
									<OrdersTable />
								</Box>
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
