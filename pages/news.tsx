import React from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import SidebarWithHeader from "../components/SidebarWithHeader";
import MenuBox from "../components/MenuBox";
import VideoBox from "../components/VideoBox";
import PromoBox from "../components/PromoBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import NextImage from "next/image";

import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	chakra,
	Flex,
	Heading,
	IconButton,
	Image,
	Link,
	SimpleGrid,
	Stack,
	Tag,
	Text,
	Tooltip,
	useColorMode,
} from "@chakra-ui/react";
import info from "../lib/info";
import { BiErrorAlt } from "react-icons/bi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IoRestaurantOutline } from "react-icons/io5";
import news from "../lib/news";
import dynamic from "next/dynamic";
import { IoMdAdd } from "react-icons/io";

const Index: NextPage<unknown> = () => {
	// const { t } = useTranslation("404");
	const { colorMode } = useColorMode();
	const { t, lang } = useTranslation("home");
	const ProductImage = chakra(NextImage, {
		shouldForwardProp: (prop) =>
			["width", "height", "src", "alt"].includes(prop),
	});
	const UnorderedList = dynamic(
		async () => (await import("@chakra-ui/react")).UnorderedList
	);
	const ListItem = dynamic(
		async () => (await import("@chakra-ui/react")).ListItem
	);

	return (
		<>
			{/* <Head>
				<title>Пиццерия ⸻ Страница не найдена</title>
			</Head> */}
			<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
				<Flex
					// h={0}
					// alignItems={"start"}
					// justifyContent={"center"}
					flexDirection={{ base: "column", xl: "row" }}
					mr={{ base: "1rem", xl: "0" }}
				>
					<Box
						transition=".3s ease"
						borderWidth="1px"
						borderRadius="lg"
						padding="1rem"
						margin=".5rem"
						// marginBottom="4rem"
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
									Новости{" "}
								</Tag>
							)}
							<IconButton aria-label="News" icon={<IoRestaurantOutline />} />
						</div>
						<Stack spacing={5}>
							<SimpleGrid
								minChildWidth="15rem"
								spacing={3}
								justifyContent="center"
								alignItems="center"
								pt="1rem"
							>
								{news(lang as "en" | "ru").map((item) => (
									<Link>
										<Box
											key={item.name}
											borderWidth="1px"
											borderRadius="lg"
											padding="1rem"
										>
											<Stack spacing={3}>
												<ProductImage
													src={`/${item.image}`}
													alt={`${t("photoOf")} ${item.name}`}
													draggable={false}
													loading="lazy"
													decoding="async"
													width="auto"
													height={150}
													objectFit="cover"
													borderRadius="md"
												/>
												<Text color="gray.500">03.04.2022</Text>

												<Heading size="md" mr="1%">
													{item.name}
												</Heading>
												<Text color="gray.500" fontSize=".8rem">
													{item.ingredients.join(", ")}
												</Text>
												{/* <ButtonGroup isAttached>
												{item.variants.map((element) => (
													<Button
														key={element.type}
														leftIcon={<IoMdAdd />}
														colorScheme="orange"
														width="100%"
													>
														<Stack spacing={0}>
															<Text>{element.type}</Text>
															<Text opacity=".8" fontSize=".75rem">
																{element.price} {info.currency ?? "USD"}
															</Text>
														</Stack>
													</Button>
												))}
											</ButtonGroup> */}
											</Stack>
										</Box>
									</Link>
								))}
							</SimpleGrid>
						</Stack>
					</Box>
					<Flex
						flexShrink="10"
						flexDirection="column"
						// h={{ base: "100%", xl: "140rem" }}
						alignItems={"center"}
						width={{ base: "100%", xl: "xl" }}
						margin=".5rem"
						// width="35%"
					>
						<VideoBox />
						<PromoBox />
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
