import React, { ReactNode, useEffect, useState } from "react";
import firebase from "../firebase";
import { getAuth } from "firebase/auth";
import { useSession, signIn, signOut } from "next-auth/react";

import {
	IconButton,
	Avatar,
	// Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorMode,
	useColorModeValue,
	Link,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	DrawerFooter,
	DrawerBody,
	DrawerHeader,
	Button,
	Stack,
	Collapse,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useBreakpointValue,
	Heading,
} from "@chakra-ui/react";
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
} from "react-icons/fi";
import { GrRestaurant } from "react-icons/gr";
import { FaBell, FaPizzaSlice } from "react-icons/fa";
import { IoRestaurantOutline, IoPizzaOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { db } from "../firebase";

import {
	MdOutlineDarkMode,
	MdExpandLess,
	MdExpandMore,
	MdOutlineLightMode,
	MdMenu,
	MdKitchen,
	MdOutlineMessage,
} from "react-icons/md";
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from "@chakra-ui/icons";

import LargeWithNewsletter from "./Footer";

import info from "../lib/info";
import Pizza from "./pizza";

import { IconType } from "react-icons";
import { ReactText } from "react";
import useTranslation from "next-translate/useTranslation";
import { BiNews } from "react-icons/bi";
import { useRouter } from "next/router";
import LoginSidebar from "./LoginSidebar";
import LoginHeader from "./LoginHeader";
import {
	useCollection,
	useCollectionData,
} from "react-firebase-hooks/firestore";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

export default function NotificationList() {
	const { data: session } = useSession();

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "notifications"));
	// const [notifications] = useCollectionData(q);

	const [notifications, setNotifications] = useState([
		{ name: "Loading...", id: "initial" },
	]);
	useEffect(() => {
		if (!session?.user || !session?.user?.email) return;

		const q = query(
			collection(db, `notifications`),
			where("recipient", "==", session?.user?.email),
			orderBy("timestamp", "desc")
		);

		onSnapshot(q, (snapshot) => {
			setNotifications(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, []);

	const setRead = async (id) => {
		const read = true;
		const docRef = doc(db, "notifications", id);
		const payload = { read };
		await updateDoc(docRef, payload);
	};
	const handleDelete = async (id) => {
		const docRef = doc(db, "notifications", id);
		await deleteDoc(docRef);
	};
	const router = useRouter();
	const notificationList = () => {
		return notifications.map((notification) => (
			<MenuItem
				key={notification.id}
				onClick={async () => {
					await router.push("/profile", "/profile", { locale: "ru" });
					setRead(notification.id);
				}}
			>
				{notification.text}{" "}
			</MenuItem>
		));
	};
	return <>{notificationList()}</>;
}
