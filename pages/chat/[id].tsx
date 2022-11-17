import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { IconButton, Image } from "@chakra-ui/react";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
	useCollectionData,
	useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { MdOutlineMessage } from "react-icons/md";
import MotionTopIconBox from "../../components/motion/MotionTopIconBox";
import MotionTag from "../../components/motion/MotionTag";
import SendBar from "../../components/SendBar";
import { db } from "../../firebase";
import { WithSideContentLayout } from "../../layouts/menu";
import index from "../../lib";
import info from "../../lib/info";

function Chat() {
	const router = useRouter();
	const { id } = router.query;
	const { data: session } = useSession();
	// @ts-expect-error - No overload matches this call.  The last overload gave the following error.  Argument of type 'Firestore' is not assignable to parameter of type 'DocumentReference<unknown>'.	Type 'Firestore' is missing the following properties from type 'DocumentReference<unknown>': converter, firestore, id, path, and 2 more.ts(2769)
	const docRef = doc(db, "chats", id);
	const [snapshot, loadingSnapshot] = useDocumentOnce(docRef);
	const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
	const [messages] = useCollectionData(q);
	const bottomOfChat = useRef();
	const getMessages = () =>
		messages?.map((message) => {
			const sender =
				message.sender ===
				(session?.user?.email !== undefined ? session?.user?.email : "anonym");
			return (
				<Flex
					key={message.id}
					alignSelf={sender ? "flex-end" : "flex-start"}
					bg={sender ? "orange.100" : "green.100"}
					color="black"
					w="fit-content"
					minWidth="100px"
					borderRadius="lg"
					p={3}
					m={1}
				>
					<Text>{message.text}</Text>
				</Flex>
			);
		});
	const returnBack = () => {
		router.replace("/chat");
		return <></>;
	};
	const { lang } = useTranslation("index");
	const [move2, setMove2] = useState(false);

	return (
		<>
			<Head>
				<title>
					{info.title[lang as "en" | "ru"]} ⸻ {info.chat[lang as "en" | "ru"]}{" "}
					💬
				</title>
			</Head>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{info.isDevelopment && (
					<MotionTag>{info.chat[lang as "en" | "ru"]}</MotionTag>
				)}{" "}
				<MotionTopIconBox>
					<IconButton aria-label="Chat" icon={<MdOutlineMessage />} />
				</MotionTopIconBox>
			</div>

			<Stack spacing={5}>
				<Stack
					minW={{ base: "auto", xl: "20rem" }}
					spacing={3}
					px={{ base: "1rem", xl: "10%" }}
					direction={"row"}
				>
					<Stack direction={{ base: "column-reverse", xl: "row" }} spacing={3}>
						<Box
							borderWidth="1px"
							borderRadius="lg"
							padding="1rem"
							width="100%"
							height="90vh"
							minW={{ base: "auto", xl: "50%" }}
						>
							{!loadingSnapshot &&
							!snapshot
								?.data()
								?.users.includes(session?.user?.email || "anonym") ? (
								returnBack()
							) : (
								<Flex
									direction="column"
									sx={{ scrollbarWidth: "none" }}
									flex={1}
								>
									<Flex
										flex={1}
										direction="column"
										pt={4}
										mx={5}
										maxH="80vh"
										minH="80vh"
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
										<Stack
											direction={"row"}
											alignItems="top"
											justifyContent="space-around"
										>
											<motion.div
												style={{
													fontSize: "2.5rem",
													marginTop: "-1rem",
												}}
												drag="y"
												animate={{ x: move2 ? 10 : -10 }}
												transition={{
													type: "spring",
													bounce: 0.8,
													duration: 1,
												}}
												whileHover={{ scale: 2 }}
												onClick={() => setMove2(!move2)}
											>
												📧
											</motion.div>
										</Stack>
										{getMessages()}
									</Flex>
									<SendBar id={id} user={session?.user} />
								</Flex>
							)}
						</Box>
						<Stack
							direction="column"
							pl={{ base: "none", xl: "10%" }}
							spacing={5}
						>
							<Heading size="lg">{index.chat[lang as "en" | "ru"]} </Heading>
							<Image
								src="/images/chat.gif"
								alt="messages in the chat gif"
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
		</>
	);
}

Chat.PageLayout = WithSideContentLayout;

export default Chat;
