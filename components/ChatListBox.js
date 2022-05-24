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
	TableContainer,
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

export default function ChatListBox() {
	const { data: session } = useSession();

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "chats"));
	const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const router = useRouter();

	const redirect = (id) => {
		router.push(`/chat/${id}`);
	};


	const chatExists = (email) =>
		chats?.find(
			(chat) =>
				chat.users.includes(session?.user?.email) && chat.users.includes(email)
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
				users: [session?.user?.email, input],
			});
		}
	};

	const chatList = () => {
		return chats
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
