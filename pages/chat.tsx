import React from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import SidebarWithHeader from "../components/SidebarWithHeader";
import VideoBox from "../components/VideoBox";
import NewsBox from "../components/NewsBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import {
	Box,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	Tag,
	useColorMode,
} from "@chakra-ui/react";
import info from "../lib/info";
import { MdOutlineMessage, MdOutlineSend } from "react-icons/md";
import { db } from "../firebase";
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
										minW={{ base: "auto", xl: "50%" }}
										height="90vh"
										maxH="90vh"
										overflowY="auto"
										css={{
											"&::-webkit-scrollbar": {
												width: "4px",
											},
											"&::-webkit-scrollbar-track": {
												width: "6px",
											},
											"&::-webkit-scrollbar-thumb": {
												background: "rgba(6, 8, 13, 0.25)",
												borderRadius: "24px",
											},
										}}
									>
										<Heading size="md">
											Для вопросов к Пиццерии создайте чат и введите наш email -
											neugomonovv@gmail.com 📧
										</Heading>

										<ChatListBox />
									</Box>

									<Stack
										direction="column"
										pl={{ base: "none", xl: "10%" }}
										spacing={5}
									>
										<Heading size="lg">
											Задавайте вопросы в чат с рестораном, и мы обязательно
											ответим!
										</Heading>
										<Image
											src="/images/chat.gif"
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
