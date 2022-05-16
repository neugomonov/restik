import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import SidebarWithHeader from "./SidebarWithHeader";
import MenuBox from "./MenuBox";
import VideoBox from "./VideoBox";
import NewsBox from "./NewsBox";
import Cart from "./Cart";
import LargeWithNewsletter from "./Footer";
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Image,
	Input,
	Stack,
	HStack,
	VStack,
	Table,
	TableCaption,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	useColorMode,
	useColorModeValue,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	MenuDivider,
	Editable,
	EditablePreview,
	EditableInput,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import info from "../lib/info";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePhone, AiTwotoneMail } from "react-icons/ai";
import { MdPassword, MdPlace } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { MdOutlineMessage, MdOutlineSend } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

export default function ProfileButtons() {
	const { data: session } = useSession();

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "users"));
	const router = useRouter();
	const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);
	console.log("please");
	console.log(snapshot);
	console.log(users);
	console.log("thanks");

	useEffect(
		() =>
			onSnapshot(collection(db, "users"), (snapshot) =>
				setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			),
		[]
	);

	const handleEditAddress = async (id) => {
		const email = prompt("Введите ваш email");
		const address = prompt("Введите ваш адрес");
		if (email == session?.user?.email) {
			const docRef = doc(db, "users", id);
			const payload = { address };
			updateDoc(docRef, payload);
		}
	};

	console.log(session?.user?.role);
	console.log(session?.user?.id);

	return (
		<>
			<Stack direction={{ base: "column", md: "row" }}>
				<Button
					size="md"
					aria-label={t("remove")}
					leftIcon={<AiOutlinePhone />}
				>
					Телефон
				</Button>
				<Button
					size="md"
					aria-label={t("add")}
					leftIcon={<MdPlace />}
					// onClick={() => handleEditAddress(session?.user?.id)}
				>
					Адрес
				</Button>
				<Button size="md" aria-label={t("add")} leftIcon={<AiTwotoneMail />}>
					Почта
				</Button>
			</Stack>
		</>
	);
}
