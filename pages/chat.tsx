import React from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import SidebarWithHeader from "../components/SidebarWithHeader";
import MenuBox from "../components/MenuBox";
import VideoBox from "../components/VideoBox";
import NewsBox from "../components/NewsBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Image,
	Input,
	Stack,
	Tag,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import info from "../lib/info";
import { BiErrorAlt } from "react-icons/bi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdOutlineMessage, MdOutlineSend } from "react-icons/md";
// import { db } from "./api/auth/[...nextauth]";
import { db } from "../firebase";
import getOtherEmail from "../utils/getOtherEmail";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Index: NextPage<unknown> = () => {
	const { data: session } = useSession();

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "chats"));
	const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const router = useRouter();

	const redirect = (id: string) => {
		router.push(`/chat/${id}`);
	};

	console.log("please");
	console.log(snapshot);
	console.log(chats);
	console.log("thanks");

	// const chatList = () => {
	// 	return chats
	// 		?.filter((chat) => chat.users.includes(session?.user?.email))
	// 		.map((chat) => (
	// 			<Flex
	// 				key={Math.random()}
	// 				p={3}
	// 				align="center"
	// 				_hover={{ bg: "gray.100", cursor: "pointer" }}
	// 				onClick={() => redirect(chat.id)}
	// 			>
	// 				<Avatar src="" marginEnd={3} />
	// 				<Text>{getOtherEmail(chat.users, session?.user?.email)}</Text>
	// 			</Flex>
	// 		));
	// };

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
									Чат{" "}
								</Tag>
							)}
							<IconButton aria-label="Chat" icon={<MdOutlineMessage />} />
						</div>
						<Stack spacing={5}>
							<Stack
								minW={{ base: "auto", xl: "20rem" }}
								spacing={3}
								px={{ base: "1rem", xl: "10%" }}
								// alignItems="center"
								direction={"row"}
							>
								<Stack
									direction={{ base: "column-reverse", xl: "row" }}
									spacing={3}
								>
									<Box
										borderWidth="1px"
										borderRadius="lg"
										padding="1rem"
										width="100%"
										height="90vh"
										minW={{ base: "auto", xl: "50%" }}
									>
										<Flex
											direction="column"
											sx={{ scrollbarWidth: "none" }}
											flex={1}
										>
											{/* {chatList()} */}
										</Flex>
										<Stack spacing={3}>
											{/* <ProductImage
													src={`/${item.image}`}
													alt={`${t("photoOf")} ${item.name}`}
													draggable={false}
													loading="lazy"
													decoding="async"
													width="auto"
													height={150}
													objectFit="cover"
													borderRadius="md"
												/> */}
											{/* <Text color="gray.500">03.04.2022</Text> */}
											<Flex height="65vh"></Flex>
											<Stack
												direction={"row"}
												// height=" 10vh"
												// position=" fixed"
												// bottom=" 0"
											>
												<Input
													placeholder={"Ваше сообщение"}
													bg={
														colorMode === "dark"
															? "whiteAlpha.100"
															: "blackAlpha.100"
													}
													border={0}
													_focus={{
														bg: "whiteAlpha.300",
													}}
													// onChange={(e) => setValue(e.target.value)}
												/>
												<IconButton
													colorScheme="orange"
													// bg={useColorModeValue("orange.400", "yellow.500")}
													// color={useColorModeValue("white", "gray.800")}
													aria-label="Send"
													icon={<MdOutlineSend />}
													// onClick={sendMessage}
												/>
											</Stack>

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
									<Stack
										// display={{ base: "none", md: "flex" }}
										direction="column"
										pl={{ base: "none", xl: "10%" }}
										spacing={5}
									>
										<Heading size="lg">
											Задавайте вопросы в чат с рестораном, и мы обязательно
											ответим!
										</Heading>
										<Image
											src="images/chat.gif"
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
