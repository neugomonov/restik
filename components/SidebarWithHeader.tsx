import {
	Avatar,
	BoxProps,
	Button,
	CloseButton,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	FlexProps,
	Heading,
	HStack,
	Icon,
	IconButton,
	Link as ChakraLink,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Tag,
	Text,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactText, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BiNews } from "react-icons/bi";
import { FiBell, FiHome, FiMenu } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";
import { ImMagicWand } from "react-icons/im";
import { IoPizzaOutline, IoRestaurantOutline } from "react-icons/io5";
import {
	MdKitchen,
	MdOutlineDarkMode,
	MdOutlineLightMode,
	MdOutlineMessage,
} from "react-icons/md";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import info from "../lib/info";
import { _blur } from "../lib/recoil-atoms";
import LoginHeader from "./LoginHeader";
import LoginSidebar from "./LoginSidebar";
import MotionBox from "./motion/MotionBox";
import NotificationList from "./NotificationList";
import Pizza from "./Pizza";

const Box = dynamic(async () => (await import("@chakra-ui/react")).Box);
const Logo = (props: { color: string }) => {
	const { t, lang } = useTranslation("home");
	return (
		<Stack
			as={motion.div}
			cursor="pointer"
			drag
			dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
			whileDrag={{ scale: 1.2, rotate: 10 }}
			dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
			direction="row"
			alignItems="center"
			spacing={3}
		>
			<Avatar
				as={motion.div}
				name={info.name}
				src="/images/chief.jpg"
				size="md"
				draggable={false}
				whileTap={{
					scale: 0.9,
				}}
				whileHover={{
					scale: 1.2,
					rotate: 360,
					transition: { type: "spring", bounce: 0.8, duration: 1 },
				}}
			/>
			<Heading as="h4" size="md">
				{info.title[lang as "en" | "ru"] ?? t("restaurantName")}
			</Heading>
		</Stack>
	);
};

interface LinkItemProps {
	name: { en: string; ru: string };
	icon: IconType;
	href: string;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: info.home, icon: FiHome, href: `/` },
	{ name: info.menu, icon: IoPizzaOutline, href: `/menu` },
	{ name: info.promo, icon: IoRestaurantOutline, href: `/promo` },
	{ name: info.chat, icon: MdOutlineMessage, href: `/chat` },
	{ name: info.news, icon: BiNews, href: `/news` },
	{ name: info.kitchen, icon: MdKitchen, href: `/about` },
];

export default function SidebarWithHeader() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [blurMode] = useRecoilState(_blur);
	return (
		<Box>
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
						transition="box-shadow .5s ease, background-color .5s ease, border .3s ease, border-color .3s ease, background .3s ease, backdrop-filter .3s ease"
						bg={useColorModeValue(
							"rgba(255, 255, 255, 0)",
							"rgba(6, 8, 13, 0)"
						)}
						backdropFilter={blurMode.blur ? "auto" : "none"}
						backdropBlur="20px"
					>
						<SidebarContent onClose={onClose} />
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
			<MobileNav onOpen={onOpen} />
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { data: session } = useSession();
	const [notificationsCount, setNotificationsCount] = useState(0);
	useEffect(() => {
		async function getNotificationsCount() {
			if (!session?.user || !session?.user?.email) return;
			const qq = await query(
				collection(db, "notifications"),
				where("read", "==", false),
				where("recipient", "==", session?.user?.email)
			);
			const count = onSnapshot(qq, (querySnapshot) => {
				setNotificationsCount(querySnapshot.size);
			});
			return () => {
				count();
			};
		}
		getNotificationsCount();
	}, [session]);
	const deleteAll = async () => {
		const qq = await query(
			collection(db, "notifications"),
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
	const [blurMode, setBlurMode] = useRecoilState(_blur);
	const handleBlur = () => {
		setBlurMode((prevState) => ({
			blur: !prevState.blur,
		}));
	};
	const {
		isOpen: isMenuOpen,
		onOpen: onMenuOpen,
		onClose: onMenuClose,
	} = useDisclosure();
	const router = useRouter();
	const { t, lang } = useTranslation("menu");
	return (
		<Box
			transition="box-shadow .5s ease, background-color .5s ease, border .3s ease, border-color .3s ease, background .3s ease, backdrop-filter .3s ease"
			as={useBreakpointValue({ base: Box, md: motion.div }, "md")}
			initial="appearing"
			animate="visible"
			variants={{
				appearing: { x: -240 },
				visible: {
					x: 0,
					transition: {
						ease: easeInOutExpo,
						duration: 1,
					},
				},
			}}
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
			backdropFilter={blurMode.blur ? "auto" : "none"}
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
				p="1rem 1rem 0 1rem"
				display={{ base: "none", md: "flex" }}
			>
				<Menu>
					<Box
						as={motion.div}
						cursor="pointer"
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 0.9, rotate: 10 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.9,
						}}
						whileHover={{
							scale: 1.1,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
					>
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
							{info.notifications[lang as "en" | "ru"]}
						</Button>
					</Box>
					<MenuList
						bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						{session ? (
							<>
								<Flex align="center" justify="space-around">
									<Text alignSelf="center" as={ChakraLink} onClick={deleteAll}>
										🧹 {info.clear[lang as "en" | "ru"] ?? t("clear")}
									</Text>
									<Text alignSelf="center" as={ChakraLink} onClick={readAll}>
										{info.read[lang as "en" | "ru"] ?? t("read")} ✉️
									</Text>
								</Flex>
								<NotificationList />
							</>
						) : (
							<Flex
								align="center"
								justify="space-around"
								onClick={() => signIn()}
							>
								<Text alignSelf="center" as={ChakraLink}>
									🔔 {info.signIn[lang as "en" | "ru"] ?? t("signIn")} 🙋
								</Text>
							</Flex>
						)}
					</MenuList>
				</Menu>
				<MotionBox>
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
				</MotionBox>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				spacing={1}
				p="0 1rem"
				mb="2"
			>
				<MotionBox>
					<IconButton
						size={"lg"}
						icon={<ImMagicWand />}
						variant="ghost"
						aria-label={"Toggle Blur"}
						onClick={handleBlur}
					/>
				</MotionBox>
				<Menu
					isLazy
					isOpen={isMenuOpen}
					placement="auto"
					onOpen={onMenuOpen}
					onClose={onMenuClose}
				>
					<Box
						as={motion.div}
						cursor="pointer"
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 0.9, rotate: 10 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.9,
						}}
						whileHover={{
							scale: 1.1,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
					>
						<Button
							as={MenuButton}
							p="3"
							align="center"
							justify="center"
							size="lg"
							variant="ghost"
							aria-label="Change language"
							rightIcon={
								<Stack direction="row" spacing={2}>
									<HiOutlineTranslate />{" "}
								</Stack>
							}
						>
							{info.translate[lang as "en" | "ru"]}
						</Button>
					</Box>
					<MenuList
						bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						{router.locales!.map((locale) => (
							<Link key={locale} href={router.asPath} locale={locale}>
								<MenuItem>{locale === "en" ? "English" : "Русский"}</MenuItem>
							</Link>
						))}
					</MenuList>
				</Menu>
			</Stack>
			{LinkItems.map((link) => (
				<NavItem
					key={link.name[lang as "en" | "ru"]}
					icon={link.icon}
					href={link.href}
					onClose={onClose}
				>
					{link.name[lang as "en" | "ru"]}
				</NavItem>
			))}
			<Flex mt="13rem">
				<Pizza />
			</Flex>
		</Box>
	);
};

function easeInOutExpo(x: number): number {
	return x === 0
		? 0
		: x === 1
		? 1
		: x < 0.5
		? Math.pow(2, 20 * x - 10) / 2
		: (2 - Math.pow(2, -20 * x + 10)) / 2;
}

interface NavItemProps extends FlexProps {
	icon: IconType;
	href: string;
	children: ReactText;
	onClose: () => void;
}

const NavItem = ({ onClose, icon, href, children, ...rest }: NavItemProps) => {
	const router = useRouter();
	return (
		<>
			<Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
				<Flex
					as={motion.div}
					cursor="pointer"
					drag
					dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
					whileDrag={{ scale: 0.9, rotate: 10 }}
					dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
					whileTap={{
						scale: 0.9,
					}}
					whileHover={{
						scale: 1.1,
						transition: { type: "spring", bounce: 0.8 },
					}}
					onClick={async () => {
						await router.push(href, href);
						await onClose();
					}}
					transition="background-color 0.2s ease"
					align="center"
					p="4"
					mx="4"
					borderRadius="lg"
					role="group"
					_hover={{
						bg: useColorModeValue("orange.400", "yellow.400"),
						color: "black",
					}}
					{...rest}
				>
					{icon && (
						<Icon
							mr="4"
							fontSize="16"
							_groupHover={{
								color: "black",
							}}
							as={icon}
						/>
					)}
					{children}
				</Flex>
			</Box>
		</>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { t, lang } = useTranslation("home");
	const { data: session } = useSession();
	const [notificationsCount, setNotificationsCount] = useState(0);
	useEffect(() => {
		async function getNotificationsCount() {
			if (!session?.user || !session?.user?.email) return;
			const qq = await query(
				collection(db, "notifications"),
				where("read", "==", false),
				where("recipient", "==", session?.user?.email)
			);
			const count = onSnapshot(qq, (querySnapshot) => {
				setNotificationsCount(querySnapshot.size);
			});
			return () => {
				count();
			};
		}
		getNotificationsCount();
	}, [session]);
	const deleteAll = async () => {
		const qq = await query(
			collection(db, "notifications"),
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
	const [blurMode] = useRecoilState(_blur);
	return (
		<Flex
			transition="box-shadow .5s ease, background-color .5s ease, border .3s ease, border-color .3s ease, background .3s ease, backdrop-filter .3s ease"
			display={{ base: "flex", md: "none" }}
			mx="1%"
			px={4}
			height="20"
			alignItems="center"
			bg={useColorModeValue(
				"rgba(255, 255, 255, 0.75)",
				"rgba(6, 8, 13, 0.75)"
			)}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			borderRadius="2xl"
			justifyContent={{ base: "space-between", md: "flex-end" }}
			backdropFilter={blurMode.blur ? "auto" : "none"}
			backdropBlur="20px"
			as="header"
			position="fixed"
			top="1"
			w="98%"
			{...rest}
		>
			<MotionBox>
				<IconButton
					display={{ base: "flex", md: "none" }}
					onClick={onOpen}
					variant="outline"
					aria-label="open menu"
					icon={<FiMenu />}
				/>
			</MotionBox>
			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontWeight="bold"
			>
				{info.name ?? t("restaurantName")}
			</Text>
			<HStack spacing={{ base: "0", md: "6" }}>
				<MotionBox>
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
				</MotionBox>
				<MotionBox>
					<Menu>
						<IconButton
							as={MenuButton}
							p="4"
							align="center"
							justify="center"
							size="lg"
							variant="ghost"
							aria-label="open menu"
							icon={
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
						/>
						<MenuList
							bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							{session ? (
								<>
									<Flex align="center" justify="space-around">
										<Text
											alignSelf="center"
											as={ChakraLink}
											onClick={deleteAll}
										>
											🧹 {info.clear[lang as "en" | "ru"] ?? t("clear")}
										</Text>
										<Text alignSelf="center" as={ChakraLink} onClick={readAll}>
											{info.read[lang as "en" | "ru"] ?? t("read")} ✉️
										</Text>
									</Flex>
									<NotificationList />
								</>
							) : (
								<Flex
									align="center"
									justify="space-around"
									onClick={() => signIn()}
								>
									<Text alignSelf="center" as={ChakraLink}>
										🔔 {info.signIn[lang as "en" | "ru"] ?? t("signIn")} 🙋
									</Text>
								</Flex>
							)}
						</MenuList>
					</Menu>
				</MotionBox>
				<LoginHeader />
			</HStack>
		</Flex>
	);
};
