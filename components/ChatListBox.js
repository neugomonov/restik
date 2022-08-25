import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { db } from "../firebase";
import getOtherEmail from "../utils/getOtherEmail";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ChatListBox() {
	const { data: session } = useSession();

	const [snapshot] = useCollection(collection(db, "chats"));
	const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const router = useRouter();

	const redirect = (id) => {
		router.push(`/chat/${id}`);
	};

	const chatExists = (email) =>
		chats?.find(
			(chat) =>
				chat.users.includes(session?.user?.email || "anonym") &&
				chat.users.includes(email)
		);

	const newChat = async () => {
		const input = prompt("Введите email того, с кем вы хотите начать чат");
		if (
			!chatExists(input) &&
			input != session?.user?.email &&
			input != null &&
			input != ""
		) {
			await addDoc(collection(db, "chats"), {
				users: [
					session?.user?.email !== undefined ? session?.user?.email : "anonym",
					input,
				],
			});
		}
	};

	const chatList = () => {
		return (
			chats
				?.filter((chat) => chat.users.includes(session?.user?.email))
				.map((chat) => (
					<Flex
						key={Math.random()}
						p={3}
						align="center"
						_hover={{ bg: "gray.100", cursor: "pointer" }}
						onClick={() => redirect(chat.id)}
					>
						<Avatar src="" marginEnd={3} />
						<Text fontSize={{ base: "xs", sm: "md" }}>
							{getOtherEmail(chat.users, session?.user?.email)}
						</Text>
					</Flex>
				)),
			chats
				?.filter((chat) => chat.users.includes("anonym"))
				.map((chat) => (
					<Flex
						key={Math.random()}
						p={3}
						align="center"
						_hover={{ bg: "gray.100", cursor: "pointer" }}
						onClick={() => redirect(chat.id)}
					>
						<Avatar src="" marginEnd={3} />
						<Text fontSize={{ base: "xs", sm: "md" }}>
							{getOtherEmail(chat.users, "anonym")}
						</Text>
					</Flex>
				))
		);
	};
	return (
		<>
			<Button m={5} p={4} onClick={() => newChat()}>
				Создать чат
			</Button>

			<Flex direction="column" sx={{ scrollbarWidth: "none" }} flex={1}>
				{chatList()}
			</Flex>
		</>
	);
}
