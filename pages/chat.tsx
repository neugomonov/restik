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
import { collection, addDoc } from "@firebase/firestore";
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
import ChatListBox from "../components/ChatListBox";

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

	// const chatExists = (email: string) =>
	// 	chats?.find(
	// 		(chat) =>
	// 			chat.users.includes(session?.user?.email) && chat.users.includes(email)
	// 	);

	// const newChat = async () => {
	// 	const input = prompt("Введите email того, с кем вы хотите начать чат");
	// 	if (
	// 		!chatExists(input) &&
	// 		input != session?.user?.email &&
	// 		input != null &&
	// 		input != ""
	// 	) {
	// 		await addDoc(collection(db, "chats"), {
	// 			users: [session?.user?.email, input],
	// 		});
	// 	}
	// };

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
									<ChatListBox />
									{/* <Box
										borderWidth="1px"
										borderRadius="lg"
										padding="1rem"
										width="100%"
										height="90vh"
										minW={{ base: "auto", xl: "50%" }}
									>
										<Heading size="md">
											Для вопросов к Пиццерии создайте чат и введите наш email -
											neugomonovv@gmail.com 📧
										</Heading>

										<Button m={5} p={4} onClick={() => newChat()}>
											Создать чат
										</Button>

										<Flex
											direction="column"
											sx={{ scrollbarWidth: "none" }}
											flex={1}
										>
											{chatList()}
										</Flex>
									</Box> */}
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
