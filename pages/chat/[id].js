import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";

import Head from "next/head";
import { useRouter } from "next/router";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import BottomBar from "../../components/BottomBar";
import { IconButton, Image, Tag } from "@chakra-ui/react";
import { WithSideContentLayout } from "../../layouts/menu";
import info from "../../lib/info";
import { MdOutlineMessage } from "react-icons/md";
import { motion } from "framer-motion";
import index from "../../lib";
import useTranslation from "next-translate/useTranslation";

// TODO: add protection rules for the private chats
function Chat() {
	const router = useRouter();
	const { id } = router.query;
	const { data: session } = useSession();
	const [chat] = useDocumentData(doc(db, "chats", id));
	const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
	const [messages] = useCollectionData(q);
	const bottomOfChat = useRef();

	const getMessages = () =>
		messages?.map((msg) => {
			const sender =
				msg.sender ===
				(session?.user?.email !== undefined ? session?.user?.email : "anonym");
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
	const { lang } = useTranslation("index");
	const [move2, setMove2] = useState(false);

	return (
		<>
			<Head>
				<title>
					{info.title[lang]} ⸻ {info.chat[lang]} 💬
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
					<Tag
						as={motion.div}
						cursor="pointer"
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 1.2, rotate: 10 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.9,
						}}
						whileHover={{
							scale: 1.2,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						{info.chat[lang]}
					</Tag>
				)}{" "}
				<Box
					as={motion.div}
					drag
					dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
					whileDrag={{ scale: 1.2, rotate: -45 }}
					dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
					whileTap={{
						scale: 0.9,
					}}
					whileHover={{
						scale: 1.2,
						transition: { type: "spring", bounce: 0.8, duration: 1 },
					}}
				>
					<IconButton aria-label="Chat" icon={<MdOutlineMessage />} />
				</Box>
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
							<Flex direction="column" sx={{ scrollbarWidth: "none" }} flex={1}>
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
												fontSize: "40px",
											}}
											drag="y"
											animate={{ x: move2 ? 10 : -10 }}
											transition={{ type: "spring", bounce: 0.8, duration: 1 }}
											whileHover={{ scale: 2 }}
											onClick={() => setMove2(!move2)}
										>
											📧
										</motion.div>
									</Stack>
									{getMessages()}
								</Flex>
								<BottomBar id={id} user={session?.user} />
							</Flex>
						</Box>
						<Stack
							direction="column"
							pl={{ base: "none", xl: "10%" }}
							spacing={5}
						>
							<Heading size="lg">{index.chat[lang]} </Heading>
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
