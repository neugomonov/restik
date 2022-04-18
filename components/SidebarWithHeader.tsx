import React, { ReactNode } from "react";
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
import { FaPizzaSlice } from "react-icons/fa";
import { IoRestaurantOutline, IoPizzaOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

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
const Box = dynamic(async () => (await import("@chakra-ui/react")).Box);

const Logo = (props: any) => {
	const { t, lang } = useTranslation("home");

	return (
		<Stack direction="row" alignItems="center" spacing={3}>
			<Avatar
				name={info.name}
				src="images/chief.jpg"
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

			<Flex
				alignItems={"center"}
				justifyContent={"center"}
				display={{ base: "none", md: "flex" }}
				mx="2"
			>
				<Menu>
					<MenuButton transition="all 0.3s" _focus={{ boxShadow: "none" }}>
						<Box
							p={4}
							alignItems={"center"}
							justifyContent={"center"}
							display={{ base: "none", md: "flex" }}
							// mx="8"
							transition=".3s ease"
							borderWidth="1px"
							borderRadius="lg"
							// padding="1rem"
							// margin=".5rem"
							// marginBottom="4rem"
							// width={{ base: "100%", xl: "5xl" }}
							// mt={{ base: "6rem", md: ".5rem" }}
							boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
							backgroundColor={
								colorMode === "dark"
									? "rgba(6, 8, 13, 0.25)"
									: "rgba(255, 255, 255, 0.25)"
							}
							position="relative"
							// backdropFilter="auto"
							// backdropBlur="20px"
						>
							<HStack>
								<Avatar
									size={"sm"}
									src={
										"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
									}
								/>
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">Мария Иванова</Text>
									<Text
										fontSize="xs"
										color={useColorModeValue("gray.600", "gray.300")}
									>
										Посетитель
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</Box>
					</MenuButton>
					<MenuList
						bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						<MenuItem
							onClick={async () => {
								await router.push("/profile", "/profile", { locale: "ru" });
							}}
						>
							Профиль
						</MenuItem>
						<MenuItem>Настройки</MenuItem>
						<MenuDivider />
						<MenuItem>Выйти</MenuItem>
					</MenuList>
				</Menu>
			</Flex>

			<Stack
				direction="row"
				spacing={1}
				p="1rem"
				display={{ base: "none", md: "flex" }}
				mb="2"
			>
				<Button
					size="lg"
					variant="ghost"
					aria-label="open menu"
					leftIcon={<FiBell />}
				>
					Оповещения
				</Button>
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
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}
						>
							<HStack>
								<Avatar
									size={"sm"}
									src={
										"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
									}
								/>
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">Мария Иванова</Text>
									<Text
										fontSize="xs"
										color={useColorModeValue("gray.600", "gray.300")}
									>
										Посетитель
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuItem
								onClick={async () => {
									await router.push("/profile", "/profile", { locale: "ru" });
								}}
							>
								Профиль
							</MenuItem>
							<MenuItem>Настройки</MenuItem>
							<MenuDivider />
							<MenuItem>Выйти</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
