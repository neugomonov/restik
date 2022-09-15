import React from "react";
import { Box, Heading, IconButton, Image, Stack, Tag } from "@chakra-ui/react";
import info from "../lib/info";
import { MdOutlineMessage } from "react-icons/md";
import ChatListBox from "../components/ChatListBox";
import { WithSideContentLayout } from "../layouts/menu";

function Chat() {
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
								Задавайте вопросы в чат с рестораном, и мы обязательно ответим!
							</Heading>
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
