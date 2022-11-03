import { Avatar, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { addDoc, collection } from "@firebase/firestore";
import { doc, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import getOtherEmail from "../utils/getOtherEmail";
export default function ChatListBox() {
	const { data: session } = useSession();

	const [snapshot] = useCollection(collection(db, "chats"));
	const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const router = useRouter();
	const toast = useToast();

	const redirect = (id: string) => {
		router.push(`/chat/${id}`);
	};

	const chatExists = (email: string) =>
		chats?.find(
			(chat: Record<string, string>) =>
				chat.users.includes(session?.user?.email || "anonym") &&
				chat.users.includes(email!)
		);

	const newChat = async () => {
		const input = prompt("Введите email того, с кем вы хотите начать чат");
		const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (
			!chatExists(input!) &&
			input != session?.user?.email &&
			emailPattern.test(input!)
		) {
			await addDoc(collection(db, "chats"), {
				users: [
					session?.user?.email !== undefined ? session?.user?.email : "anonym",
					input,
				],
			});
		} else {
			toast({
				title: "Пожалуйста, введите email корректно",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	async function getOtherAvatar(chat: Record<string, string>) {
		const usersDocument = await query(
			collection(db, "users"),
			where(
				"email",
				"==",
				getOtherEmail(chat.users, session?.user?.email || "anonym")
			)
		);
		const snapshot = await getDocs(usersDocument);
		const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		results.forEach(async (result) => {
			const docRef = doc(db, "users", result.id);
			return docRef;
		});
	}
	const chatList = () => {
		return chats
			?.filter((chat: Record<string, string>) =>
				chat.users.includes(session?.user?.email || "anonym")
			)
			.map((chat: Record<string, string>) => (
				<Flex
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
						scale: 1.1,
						transition: { type: "spring", bounce: 0.8, duration: 1 },
					}}
					key={Math.random()}
					p={3}
					align="center"
					_hover={{ bg: "orange.400", textColor: "black", cursor: "pointer" }}
					onClick={() => redirect(chat.id)}
					transition="background-color 0.2s"
					mx="4"
					borderRadius="lg"
					role="group"
				>
					<Avatar src="" marginEnd={3} />
					<Text fontSize={{ base: "xs", sm: "md" }}>
						{getOtherEmail(chat.users, session?.user?.email || "anonym")}
					</Text>
				</Flex>
			));
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
