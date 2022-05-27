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
	Tag,
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
import NotificationList from "./NotificationList";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	collection,
	limit,
	onSnapshot,
	query,
	where,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
// import { signOut, useSession } from "next-auth/client";

const Box = dynamic(async () => (await import("@chakra-ui/react")).Box);

const Logo = (props: any) => {
	const { t, lang } = useTranslation("home");

	return (
		<Stack direction="row" alignItems="center" spacing={3}>
			<Avatar
				name={info.name}
				src="/images/chief.jpg"
				size="md"
				draggable={false}
			/>
			<Heading as="h4" size="md">
				{info.name ?? t("restaurantName")}
			</Heading>
		</Stack>
	);
};

interface LinkItemProps {
	name: string;
	icon: IconType;
	href: string;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: "Главная", icon: FiHome, href: "/ru" },
	{ name: "Меню", icon: IoPizzaOutline, href: "/menu" },
	{ name: "Акции", icon: IoRestaurantOutline, href: "/promo" },
	{ name: "Чат", icon: MdOutlineMessage, href: "/chat" },
	{ name: "Новости", icon: BiNews, href: "/news" },
	{ name: "Наша кухня", icon: MdKitchen, href: "/about" },
];

export default function SidebarWithHeader({
	children,
}: {
	children: ReactNode;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box /*bg={useColorModeValue("rgba(255, 255, 255, 0.75)", "rgba(6, 8, 13, 0.75)")}*/
		>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="xs"
			>
				<DrawerOverlay>
					<DrawerContent
						bg={useColorModeValue(
							"rgba(255, 255, 255, 0)",
							"rgba(6, 8, 13, 0)"
						)}
						backdropFilter="auto"
						backdropBlur="20px"
					>
						<SidebarContent onClose={onClose} />
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			{/* <Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box> */}
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	const router = useRouter();
	// const [session] = useSession();
	// const auth = getAuth();
	// const user = auth.currentUser;
	// if (user !== null) {
	// 	// The user object has basic properties such as display name, email, etc.
	// 	const displayName = user.displayName;
	// 	const email = user.email;
	// 	const photoURL = user.photoURL;
	// 	const emailVerified = user.emailVerified;

	// 	// The user's ID, unique to the Firebase project. Do NOT use
	// 	// this value to authenticate with your backend server, if
	// 	// you have one. Use User.getToken() instead.
	// 	const uid = user.uid;
	// }

	const { data: session } = useSession();
	const [notificationsCount, setNotificationsCount] = useState(0);

	useEffect(() => {
		async function getNotificationsCount() {
			if (!session?.user || !session?.user?.email) return;

			const qq = await query(
				collection(db, "notifications"),
				where("read", "==", false),
				where("recipient", "==", session?.user?.email)
				// limit(5)
			);
			const count = onSnapshot(qq, (querySnapshot) => {
				setNotificationsCount(querySnapshot.size);
			});
			return () => {
				count();
			};
		}
		getNotificationsCount();
	}, []);
	const deleteAll = async () => {
		const qq = await query(
			collection(db, "notifications"),
			// where("read", "==", false),
			where("recipient", "==", session?.user?.email)
		);
		const snapshot = await getDocs(qq);
		const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		results.forEach(async (result) => {
			const docRef = doc(db, "notifications", result.id);
			await deleteDoc(docRef);
		});
	};
	const readAll = async () => {
		const qq = await query(
			collection(db, "notifications"),
			where("read", "==", false),
			where("recipient", "==", session?.user?.email)
		);
		const snapshot = await getDocs(qq);
		const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		results.forEach(async (result) => {
			const read = true;
			const docRef = doc(db, "notifications", result.id);
			const payload = { read };
			await updateDoc(docRef, payload);
		});
	};

	return (
		<Box
			transition=".3s ease"
			bg={useColorModeValue(
				"rgba(255, 255, 255, 0.75)",
				"rgba(6, 8, 13, 0.75)"
			)}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			top="0"
			h="full"
			backdropFilter="auto"
			backdropBlur="20px"
			overflowY="auto"
			overflowX="hidden"
			css={{
				"&::-webkit-scrollbar": {
					width: "4px",
				},
				"&::-webkit-scrollbar-track": {
					width: "6px",
				},
				"&::-webkit-scrollbar-thumb": {
					// background: scrollbarColor,
					borderRadius: "24px",
				},
			}}
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold">
					<Logo color={useColorModeValue("gray.700", "white")} />
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			<LoginSidebar />

			<Stack
				direction="row"
				spacing={1}
				p="1rem"
				display={{ base: "none", md: "flex" }}
				mb="2"
			>
				{/* <IconButton
					css={{
						position: "relative !important",
					}}
					py={"2"}
					colorScheme={"gray"}
					aria-label={"Notifications"}
					size={"lg"}
					icon={
						<>
							<FaBell color={"gray.750"} />
							<Box
								as={"span"}
								color={"white"}
								position={"absolute"}
								top={"6px"}
								right={"4px"}
								fontSize={"0.8rem"}
								bgColor={"red"}
								borderRadius={"lg"}
								zIndex={9999}
								p={"1px"}
							>
								10{" "}
							</Box>
						</>
					}
				/> */}
				<Menu>
					<Button
						as={MenuButton}
						p="2"
						align="center"
						justify="center"
						size="lg"
						variant="ghost"
						aria-label="open menu"
						leftIcon={
							<Stack direction="row" spacing={2}>
								<FiBell />{" "}
								{notificationsCount > 0 && (
									<Tag
										borderRadius="full"
										colorScheme="red"
										variant="solid"
										position="absolute"
										top={notificationsCount >= 10 ? -3 : -1}
										left={-1}
									>
										{notificationsCount >= 10 ? "10+" : notificationsCount}
									</Tag>
								)}
							</Stack>
						}
					>
						Оповещения
					</Button>
					<MenuList
						bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						<Flex align="center" justify="space-around">
							<Text alignSelf="center" as={Link} onClick={deleteAll}>
								🧹 Очистить
							</Text>
							<Text alignSelf="center" as={Link} onClick={readAll}>
								Прочитано ✉️
							</Text>
						</Flex>
						<NotificationList />
					</MenuList>
				</Menu>

				<IconButton
					size={"lg"}
					icon={
						colorMode === "light" ? (
							<MdOutlineLightMode />
						) : (
							<MdOutlineDarkMode />
						)
					}
					variant="ghost"
					aria-label={"Change Color Theme"}
					onClick={toggleColorMode}
				/>
			</Stack>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} href={link.href}>
					{link.name}
				</NavItem>
			))}

			<Flex mt="10rem">
				<Pizza />
			</Flex>
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	href: string;
	children: ReactText;
}

const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
	const router = useRouter();

	return (
		<Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
			<Flex
				onClick={async () => {
					await router.push(href, href, { locale: "ru" });
				}}
				transition="all 0.2s"
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: useColorModeValue("orange.400", "yellow.400"),
					color: useColorModeValue("white", "black"),
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: useColorModeValue("white", "black"),
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Box>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { t, lang } = useTranslation("home");
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<Flex
			transition=".3s ease"
			display={{ base: "flex", md: "none" }}
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue(
				"rgba(255, 255, 255, 0.75)",
				"rgba(6, 8, 13, 0.75)"
			)}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			backdropFilter="auto"
			backdropBlur="20px"
			as="header"
			position="fixed"
			top="0"
			w="100%"
			// position={"sticky"}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				// fontFamily="monospace"
				fontWeight="bold"
			>
				{info.name ?? t("restaurantName")}
			</Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size={"lg"}
					icon={
						colorMode === "light" ? (
							<MdOutlineLightMode />
						) : (
							<MdOutlineDarkMode />
						)
					}
					variant="ghost"
					aria-label={"Change Color Theme"}
					onClick={toggleColorMode}
				/>

				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<LoginHeader />
			</HStack>
		</Flex>
	);
};
