import {
	Avatar,
	Button,
	Flex,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { addDoc, collection } from "@firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
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
	const { t } = useTranslation("common");
	const newChat = async () => {
		const input = prompt(t("newChatMessage1"));
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
				title: t("newChatMessage2"),
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	// TODO: finish it!
	async function getOtherAvatar(chat: Record<string, string>) {
		const usersRef = collection(db, "users");
		const userQuery = query(
			usersRef,
			where(
				"email",
				"==",
				getOtherEmail(chat.users, session?.user?.email || "anonym")
			)
		);
		const querySnapshot = await getDocs(userQuery);
		let image = "";
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data().image);
			image = doc.data().image;
			image =
				"https://lh3.googleusercontent.com/a-/AOh14Gjo6WKcqBWwMRbkh5oLnd7Fj-Ep6E9wUSq3KrnliA=s96-c";
			return;
		});
		return image;
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
					key={chat.id}
					p={3}
					align="center"
					_hover={{
						bg: useColorModeValue("orange.400", "yellow.400"),
						textColor: "black",
					}}
					onClick={() => redirect(chat.id)}
					transition="background-color 0.2s"
					mx="4"
					borderRadius="lg"
					role="group"
				>
					<Avatar
						src={getOtherAvatar(chat).then((value) => {
							console.log(value);
						})}
						marginEnd={3}
					/>
					<Text fontSize={{ base: "xs", sm: "md" }}>
						{getOtherEmail(chat.users, session?.user?.email || "anonym")}
					</Text>
				</Flex>
			));
	};
	return (
		<>
			<Button my={5} p={4} width="100%" onClick={() => newChat()}>
				{t("newChat")}
			</Button>
			<Flex direction="column" sx={{ scrollbarWidth: "none" }} flex={1}>
				{chatList()}
			</Flex>
		</>
	);
}
