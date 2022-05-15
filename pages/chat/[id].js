import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	// IconButton,
	// Image,
	// Input,
	Stack,
	// Tag,
	Text,
	// useColorMode,
} from "@chakra-ui/layout";
import { MdOutlineMessage, MdOutlineSend } from "react-icons/md";
import info from "../../lib/info";
import SidebarWithHeader from "../../components/SidebarWithHeader";

import VideoBox from "../../components/VideoBox";
import NewsBox from "../../components/NewsBox";
import Cart from "../../components/Cart";
import LargeWithNewsletter from "../../components/Footer";

import chat from "../chat";
import Head from "next/head";
import { useRouter } from "next/router";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import getOtherEmail from "../../utils/getOtherEmail";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import BottomBar from "../../components/BottomBar";

export default function Chat() {
	const router = useRouter();
	const { id } = router.query;
	// const [user] = useAuthState(auth);
	const { data: session } = useSession();

	const [chat] = useDocumentData(doc(db, "chats", id));
	const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
	const [messages] = useCollectionData(q);
	const bottomOfChat = useRef();
	// const { colorMode } = useColorMode();

	const getMessages = () =>
		messages?.map((msg) => {
			const sender = msg.sender === session?.user?.email;
			return (
				<Flex
					key={Math.random()}
					alignSelf={sender ? "flex-end" : "flex-start"}
					bg={sender ? "orange.100" : "green.100"}
					color="black"
					w="fit-content"
					minWidth="100px"
					borderRadius="lg"
					p={3}
					m={1}
				>
					<Text>{msg.text}</Text>
				</Flex>
			);
		});

	// useEffect(
	// 	() =>
	// 		setTimeout(
	// 			bottomOfChat.current.scrollIntoView({
	// 				behavior: "smooth",
	// 				block: "start",
	// 			}),
	// 			100
	// 		),
	// 	[messages]
	// );

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
						// backgroundColor={
						// 	colorMode === "dark"
						// 		? "rgba(6, 8, 13, 0.75)"
						// 		: "rgba(255, 255, 255, 0.75)"
						// }
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
							{/* {info.isDevelopment && (
								<Tag
									textTransform="uppercase"
									colorScheme="orange"
									variant="solid"
									mb="1rem"
								>
									Чат{" "}
								</Tag>
							)} */}
							{/* <IconButton aria-label="Chat" icon={<MdOutlineMessage />} /> */}
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
											<Flex h="85vh">
												<Head>
													<title>Пиццерия ⸻ Чат 💬</title>
												</Head>

												{/* <Sidebar /> */}

												<Flex flex={1} direction="column">
													{/* <Topbar email={getOtherEmail(chat?.users, user)} /> */}

													<Flex
														flex={1}
														direction="column"
														pt={4}
														mx={5}
														// overflowX="scroll"
														// sx={{ scrollbarWidth: "none" }}
													>
														{getMessages()}
														{/* <div ref={bottomOfChat}></div> */}
													</Flex>
													<BottomBar id={id} user={session?.user} />
												</Flex>
											</Flex>
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
												{/* <Input
													placeholder={"Ваше сообщение"}
													// bg={
													// 	colorMode === "dark"
													// 		? "whiteAlpha.100"
													// 		: "blackAlpha.100"
													// }
													border={0}
													_focus={{
														bg: "whiteAlpha.300",
													}}
													// onChange={(e) => setValue(e.target.value)}
												/> */}
												{/* <IconButton
													colorScheme="orange"
													// bg={useColorModeValue("orange.400", "yellow.500")}
													// color={useColorModeValue("white", "gray.800")}
													aria-label="Send"
													icon={<MdOutlineSend />}
													// onClick={sendMessage}
												/> */}
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
										{/* <Image
											src="images/chat.gif"
											draggable={false}
											loading="lazy"
											decoding="async"
											width="auto"
											height={300}
											objectFit="cover"
											borderRadius="md"
										/> */}
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
}
