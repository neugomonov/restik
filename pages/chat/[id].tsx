import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { IconButton, Image, Tag } from "@chakra-ui/react";
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
import SendBar from "../../components/SendBar";
import { db } from "../../firebase";
import { WithSideContentLayout } from "../../layouts/menu";
import index from "../../lib";
import info from "../../lib/info";

// TODO: add protection rules for the private chats

function Chat() {
	const router = useRouter();
	const { id } = router.query;
	const { data: session } = useSession();
	// @ts-expect-error
	const docRef = doc(db, "chats", id);
	const [snapshot, loadingSnapshot] = useDocumentOnce(docRef);
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
						{info.chat[lang as "en" | "ru"]}
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
