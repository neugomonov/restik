import { Box, Heading, IconButton, Image, Stack, Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { MdOutlineMessage } from "react-icons/md";
import ChatListBox from "../components/ChatListBox";
import { WithSideContentLayout } from "../layouts/menu";
import index from "../lib";
import info from "../lib/info";

function Chat() {
	const { t, lang } = useTranslation("info");
	const { data: session } = useSession();
	return (
		<>
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
						{info.chat[lang as "en" | "ru"] ?? t("chat")}
					</Tag>
				)}
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
							{session && (
								<Heading size="md">
									Для вопросов к Пиццерии создайте чат и введите наш email -
									neugomonovv@gmail.com
								</Heading>
							)}
							<Stack
								direction={"row"}
								alignItems="top"
								justifyContent="space-around"
							>
								<motion.div
									style={{
										fontSize: "40px",
										marginTop: "-7px",
									}}
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
								>
									📨
								</motion.div>
								<motion.div
									style={{
										fontSize: "40px",
									}}
									drag
									dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
									whileDrag={{ scale: 1.2 }}
									dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
									whileTap={{
										scale: 0.9,
									}}
									whileHover={{
										scale: 1.2,
										transition: { type: "spring", bounce: 0.8, duration: 1 },
									}}
								>
									📧
								</motion.div>
								<motion.div
									style={{
										fontSize: "40px",
										marginTop: "-7px",
									}}
									drag
									dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
									whileDrag={{ scale: 1.2, rotate: -10 }}
									dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
									whileTap={{
										scale: 0.9,
									}}
									whileHover={{
										scale: 1.2,
										transition: { type: "spring", bounce: 0.8, duration: 1 },
									}}
								>
									📩
								</motion.div>
							</Stack>
							<ChatListBox />
						</Box>

						<Stack
							direction="column"
							pl={{ base: "none", xl: "10%" }}
							spacing={5}
						>
							<Heading size="lg">{index.chat[lang as "en" | "ru"]}</Heading>
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
