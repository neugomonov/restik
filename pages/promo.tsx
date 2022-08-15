import React from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import SidebarWithHeader from "../components/SidebarWithHeader";
import VideoBox from "../components/VideoBox";
import NewsBox from "../components/NewsBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import NextImage from "next/image";

import {
	Box,
	chakra,
	Flex,
	Heading,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	Tag,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import info from "../lib/info";
import { IoRestaurantOutline } from "react-icons/io5";
import promo from "../lib/promo";

const Index: NextPage<unknown> = () => {
	const { colorMode } = useColorMode();
	const { t, lang } = useTranslation("home");
	const ProductImage = chakra(NextImage, {
		shouldForwardProp: (prop) =>
			["width", "height", "src", "alt"].includes(prop),
	});

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
									Акции{" "}
								</Tag>
							)}
							<IconButton aria-label="Promo" icon={<IoRestaurantOutline />} />
						</div>
						<Stack spacing={5}>
							{" "}
							<SimpleGrid
								minChildWidth="15rem"
								spacing={3}
								justifyContent="center"
								alignItems="center"
								pt="1rem"
							>
								{promo(lang as "en" | "ru").map((item) => (
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
													width="3840"
													height={1920}
													objectFit="cover"
													borderRadius="md"
												/>
												<Text colorScheme={"gray"}>03.04.2022</Text>

												<Heading size="md" mr="1%">
													{item.name}
												</Heading>
												<Text colorScheme={"gray"} fontSize=".8rem">
													{item.ingredients.join(", ")}
												</Text>
											</Stack>
										</Box>
									</Link>
								))}
							</SimpleGrid>
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
